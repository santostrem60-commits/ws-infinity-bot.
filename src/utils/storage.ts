import { get, set } from 'idb-keyval';
import { OperationResultPrint } from '../types';

const STORAGE_KEY = 'ws_infinity_results_idb_v1';
const CHANNEL_NAME = 'ws_infinity_results_channel';

// Create broadcast channel for tab synchronization
let channel: BroadcastChannel | null = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    channel = new BroadcastChannel(CHANNEL_NAME);
  } catch (e) {
    console.error('BroadcastChannel not supported:', e);
  }
}

// Image compression helper using HTML Canvas
export async function compressImage(dataUrl: string, maxWidth = 1600, quality = 0.85): Promise<string> {
  // If it's already a tiny string or SVG/asset path, return as is
  if (!dataUrl.startsWith('data:image')) {
    return dataUrl;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(dataUrl);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      // Convert to JPEG with quality compression
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataUrl);
    };

    img.onerror = () => resolve(dataUrl);
  });
}

// Fetch results from IndexedDB (or fallback to LocalStorage/Default)
export async function loadResultsFromStorage(defaultResults: OperationResultPrint[]): Promise<OperationResultPrint[]> {
  try {
    const stored = await get<OperationResultPrint[]>(STORAGE_KEY);
    if (stored && Array.isArray(stored) && stored.length > 0) {
      return stored;
    }

    // Check legacy localStorage fallback
    const legacy = localStorage.getItem('ws_infinity_results_v1');
    if (legacy) {
      const parsed = JSON.parse(legacy);
      if (Array.isArray(parsed) && parsed.length > 0) {
        await set(STORAGE_KEY, parsed);
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading from IndexedDB:', err);
  }

  return defaultResults;
}

// Save results to IndexedDB and notify other tabs
export async function saveResultsToStorage(results: OperationResultPrint[]): Promise<void> {
  try {
    await set(STORAGE_KEY, results);
    
    // Backup small metadata to localStorage if possible
    try {
      localStorage.setItem('ws_infinity_results_v1', JSON.stringify(results.map(r => ({
        ...r,
        imageUrl: r.imageUrl.length > 500000 ? 'idb' : r.imageUrl
      }))));
    } catch (_) {
      // Ignore quota error for localStorage backup
    }

    // Broadcast change to other open tabs/windows
    if (channel) {
      channel.postMessage({ type: 'RESULTS_UPDATED' });
    }
  } catch (err) {
    console.error('Error saving to IndexedDB:', err);
  }
}

// Listen for updates from other tabs
export function subscribeToStorageUpdates(onUpdate: () => void): () => void {
  if (!channel && typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    try {
      channel = new BroadcastChannel(CHANNEL_NAME);
    } catch (e) {
      console.error(e);
    }
  }

  if (channel) {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'RESULTS_UPDATED') {
        onUpdate();
      }
    };
    channel.addEventListener('message', handler);

    return () => {
      channel?.removeEventListener('message', handler);
    };
  }

  return () => {};
}

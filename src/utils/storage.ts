import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy,
  getDocs
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { OperationResultPrint } from '../types';

const RESULTS_COLLECTION = 'results';

// Image compression helper using HTML Canvas to keep size under Firestore document limit (~1MB)
export async function compressImage(dataUrl: string, maxWidth = 1200, quality = 0.80): Promise<string> {
  // If it's not a data URL (e.g. asset URL), return unchanged
  if (!dataUrl || !dataUrl.startsWith('data:image')) {
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
      // Convert to compressed JPEG string
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataUrl);
    };

    img.onerror = () => resolve(dataUrl);
  });
}

// Fetch results directly from Firestore
export async function loadResultsFromStorage(defaultResults: OperationResultPrint[]): Promise<OperationResultPrint[]> {
  try {
    const resultsRef = collection(db, RESULTS_COLLECTION);
    const q = query(resultsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docsData: OperationResultPrint[] = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          title: data.title || '',
          date: data.date || '',
          profit: Number(data.profit) || 0,
          winRate: data.winRate || '',
          botName: data.botName || '',
          description: data.description || '',
          imageUrl: data.imageUrl || '',
          createdAt: Number(data.createdAt) || Date.now(),
        };
      });
      return docsData;
    } else {
      // Seed default initial results to Firestore if DB is empty
      for (const item of defaultResults) {
        await setDoc(doc(db, RESULTS_COLLECTION, item.id), item);
      }
      return defaultResults;
    }
  } catch (err) {
    console.error('Erro ao carregar resultados do Firestore:', err);
    return defaultResults;
  }
}

// Save a single result item (Add or Edit) to Firestore
export async function saveSingleResultToCloud(resultItem: OperationResultPrint): Promise<void> {
  try {
    const docRef = doc(db, RESULTS_COLLECTION, resultItem.id);
    await setDoc(docRef, {
      id: resultItem.id,
      title: resultItem.title,
      date: resultItem.date,
      profit: Number(resultItem.profit) || 0,
      winRate: resultItem.winRate || '95%',
      botName: resultItem.botName || 'WS Infinity Bot',
      description: resultItem.description || '',
      imageUrl: resultItem.imageUrl,
      createdAt: Number(resultItem.createdAt) || Date.now(),
    });
  } catch (err) {
    console.error('Erro ao salvar no Firestore:', err);
    throw err;
  }
}

// Delete a result item from Firestore
export async function deleteResultFromCloud(id: string): Promise<void> {
  try {
    const docRef = doc(db, RESULTS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (err) {
    console.error('Erro ao deletar no Firestore:', err);
    throw err;
  }
}

// Subscribe to REAL-TIME updates from Firestore for all clients
export function subscribeToCloudResults(
  onUpdate: (data: OperationResultPrint[]) => void,
  fallbackDefaults: OperationResultPrint[]
): () => void {
  try {
    const resultsRef = collection(db, RESULTS_COLLECTION);
    const q = query(resultsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const items: OperationResultPrint[] = snapshot.docs.map((d) => {
            const data = d.data();
            return {
              id: d.id,
              title: data.title || '',
              date: data.date || '',
              profit: Number(data.profit) || 0,
              winRate: data.winRate || '',
              botName: data.botName || '',
              description: data.description || '',
              imageUrl: data.imageUrl || '',
              createdAt: Number(data.createdAt) || Date.now(),
            };
          });
          onUpdate(items);
        } else {
          onUpdate(fallbackDefaults);
        }
      },
      (error) => {
        console.error('Firestore listener error:', error);
      }
    );

    return unsubscribe;
  } catch (e) {
    console.error('Erro ao inscrever no Firestore:', e);
    return () => {};
  }
}

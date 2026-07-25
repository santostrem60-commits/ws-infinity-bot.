import React, { useState } from 'react';
import { UserAccount } from '../types';
import { RefreshCw, ShieldCheck, Cpu } from 'lucide-react';

interface PlataformaProps {
  account: UserAccount;
  setAccount: React.Dispatch<React.SetStateAction<UserAccount>>;
  onNavigateToAccount: () => void;
}

export const Plataforma: React.FC<PlataformaProps> = ({ account }) => {
  const platformUrl = 'https://santoswillian.netlify.app';
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Active Deriv Token / App ID
  const activeToken = account.apiKey || '33RK5PLoCzbZjQryubB6N';

  // Construct iframe URL with injected token parameter
  const iframeSrc = activeToken 
    ? `${platformUrl}/?token1=${encodeURIComponent(activeToken)}&app_id=68171`
    : platformUrl;

  const handleReloadIframe = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 py-2 space-y-3">
      {/* Embedded Platform Container */}
      <div className="relative rounded-2xl bg-[#040711] border border-slate-800 shadow-2xl overflow-hidden flex flex-col min-h-[85vh]">
        {/* Simple & Clean Header Bar */}
        <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ON-LINE
            </span>
            <span className="text-white font-bold inline-flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-blue-400" />
              WS Infinity Bot
            </span>
          </div>

          <button
            onClick={handleReloadIframe}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5 font-sans font-medium text-xs"
            title="Recarregar Plataforma"
            id="reload-platform-btn"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Recarregar</span>
          </button>
        </div>

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-[#040711] flex flex-col items-center justify-center gap-4 text-white">
            <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-xs text-slate-400 font-mono">Carregando WS Infinity Bot...</p>
          </div>
        )}

        {/* Direct Full-Height Platform Iframe */}
        <iframe
          key={iframeKey}
          src={iframeSrc}
          title="Plataforma WS Infinity Bot"
          className="w-full flex-1 min-h-[80vh] border-none bg-slate-950"
          onLoad={() => setIsLoading(false)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        {/* Status Footer */}
        <div className="px-4 py-2 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Ambiente Seguro • WS Infinity Bot</span>
          </div>
          <span className="text-slate-500 hidden sm:inline">WS Infinity Technology</span>
        </div>
      </div>
    </div>
  );
};

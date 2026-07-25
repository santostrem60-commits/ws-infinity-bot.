import React from 'react';
import { UserAccount } from '../types';
import { 
  ExternalLink, 
  Cpu, 
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import bgLogo from '../assets/images/will_santos_logo_1785014356765.jpg';

interface PlataformaProps {
  account: UserAccount;
  setAccount: React.Dispatch<React.SetStateAction<UserAccount>>;
  onNavigateToAccount: () => void;
}

export const Plataforma: React.FC<PlataformaProps> = () => {
  const popupUrl = 'https://santoswillian.netlify.app';

  const handleOpenPopup = () => {
    const width = 1280;
    const height = 850;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    window.open(
      popupUrl,
      'WS_Infinity_Bot_Popup',
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes,toolbar=no,menubar=no`
    );
  };

  return (
    <div className="max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 py-3 space-y-4">
      {/* Main Container with User Background Image */}
      <div className="relative rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col min-h-[78vh]">
        {/* Top Header Bar */}
        <div className="px-4 py-2.5 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 z-20">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SISTEMA ATIVO
            </span>
            <span className="text-white font-bold inline-flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-blue-400" />
              WS Infinity Bot — Will Santos
            </span>
          </div>

          <button
            onClick={handleOpenPopup}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
            id="top-bar-popup-btn"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Abrir em Pop-Up</span>
          </button>
        </div>

        {/* Background Image Container */}
        <div 
          onClick={handleOpenPopup}
          className="relative flex-1 min-h-[65vh] flex flex-col items-center justify-center p-6 text-center cursor-pointer group bg-slate-950 overflow-hidden"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ backgroundImage: `url(${bgLogo})` }}
          />
          
          {/* Subtle Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/50 backdrop-blur-[1px]" />

          {/* Central Interactive Content */}
          <div className="relative z-10 max-w-2xl mx-auto space-y-6 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-blue-500/30 backdrop-blur-md shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/30 border border-cyan-300/40">
              <Zap className="w-8 h-8 fill-slate-950" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-cyan-300 font-mono text-xs font-bold inline-flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                santoswillian.netlify.app
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                WS Infinity Bot
              </h1>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Plataforma de alta performance desenvolvida por Will Santos. Clique abaixo para abrir o robô em janela interativa.
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenPopup();
              }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-black text-base flex items-center justify-center gap-3 mx-auto shadow-2xl shadow-cyan-500/30 transition-all transform hover:scale-105"
            >
              <ExternalLink className="w-5 h-5 text-slate-950" />
              <span>ACESSAR PLATAFORMA (POP-UP)</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono z-20">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Link Oficial: https://santoswillian.netlify.app</span>
          </div>
          <span className="text-slate-500 hidden sm:inline">WS Infinity Technology • Will Santos</span>
        </div>
      </div>
    </div>
  );
};

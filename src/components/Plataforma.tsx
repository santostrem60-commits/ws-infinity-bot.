import React, { useState } from 'react';
import { UserAccount } from '../types';
import { RefreshCw, ShieldCheck, Cpu, LogIn, ExternalLink, Key, Sparkles, Check, X, AlertCircle, Lock } from 'lucide-react';

interface PlataformaProps {
  account: UserAccount;
  setAccount: React.Dispatch<React.SetStateAction<UserAccount>>;
  onNavigateToAccount: () => void;
}

export const Plataforma: React.FC<PlataformaProps> = ({ account, setAccount }) => {
  const platformUrl = 'https://santoswillian.netlify.app';
  const derivOAuthUrl = 'https://oauth.deriv.com/oauth2/authorize?app_id=68171&l=PT';

  const [iframeKey, setIframeKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Token Modal state for manual token entry if needed
  const [isTokenModalOpen, setIsTokenModalOpen] = useState<boolean>(false);
  const [tokenInput, setTokenInput] = useState<string>(account.apiKey || '');
  const [statusMsg, setStatusMsg] = useState<string>('');

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

  const handleOpenOAuthWindow = () => {
    window.open(derivOAuthUrl, 'deriv_oauth', 'width=650,height=750,scrollbars=yes,status=yes');
  };

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;

    let token = tokenInput.trim();
    let acct = '';

    // Extract token if full Deriv redirect URL was pasted
    if (token.includes('token1=')) {
      try {
        const urlParams = new URLSearchParams(token.substring(token.indexOf('?')));
        token = urlParams.get('token1') || token;
        acct = urlParams.get('acct1') || '';
      } catch {
        const tokenMatch = token.match(/token1=([a-zA-Z0-9]+)/);
        if (tokenMatch) token = tokenMatch[1];
        const acctMatch = token.match(/acct1=([a-zA-Z0-9]+)/);
        if (acctMatch) acct = acctMatch[1];
      }
    }

    setAccount((prev) => ({
      ...prev,
      apiKey: token,
      isConnected: true,
      accountNumber: acct || prev.accountNumber || 'CONTA ATIVA',
    }));

    setStatusMsg('✅ Token ativado com sucesso! Recarregando robô...');
    setTimeout(() => {
      setIsTokenModalOpen(false);
      setStatusMsg('');
      handleReloadIframe();
    }, 1000);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 py-3 space-y-4 relative">
      {/* Top Deriv OAuth Notice & Action Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-500/40 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-center md:text-left">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
            <Lock className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                AUTENTICAÇÃO DERIV OAUTH
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-white mt-1 flex items-center gap-2 justify-center md:justify-start">
              <span>Log in Oficial da Deriv (Nova Janela/Aba)</span>
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </h2>
            <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
              Por segurança anti-phishing, a Deriv não permite carregar o login dentro do iFrame. Clique no botão abaixo para autorizar diretamente na Deriv!
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 w-full md:w-auto shrink-0">
          <a
            href={derivOAuthUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              handleOpenOAuthWindow();
            }}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            id="deriv-oauth-login-button"
          >
            <LogIn className="w-4 h-4 text-slate-950" />
            <span>Fazer Log in na Deriv (Nova Aba)</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-950 opacity-80" />
          </a>

          <button
            onClick={() => setIsTokenModalOpen(true)}
            className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 border border-slate-700 transition-colors"
            id="manual-token-modal-btn"
          >
            <Key className="w-4 h-4 text-emerald-400" />
            <span>Inserir Token</span>
          </button>
        </div>
      </div>

      {/* Manual Token Entry Modal */}
      {isTokenModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-slate-900 border border-emerald-500/50 rounded-2xl shadow-2xl p-6 text-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-sm">Inserir Token da Deriv</h3>
              </div>
              <button
                onClick={() => setIsTokenModalOpen(false)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveToken} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                  Token da Deriv ou URL Autorizada:
                </label>
                <input
                  type="text"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="Cole seu Token ou a URL completa após autorizar na Deriv..."
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none"
                  autoFocus
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Ao salvar, o robô carrega diretamente com este token de sessão.
                </p>
              </div>

              {statusMsg && (
                <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-semibold">
                  {statusMsg}
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  disabled={!tokenInput.trim()}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  <span>Aplicar Token</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsTokenModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Embedded Platform Container */}
      <div className="relative rounded-2xl bg-[#040711] border border-slate-800 shadow-2xl overflow-hidden flex flex-col min-h-[82vh]">
        {/* Simple & Clean Header Bar */}
        <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SESSÃO DERIV CONECTADA
            </span>
            <span className="text-white font-bold inline-flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-blue-400" />
              WS Infinity Bot (App ID: 68171)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={derivOAuthUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                handleOpenOAuthWindow();
              }}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-colors flex items-center gap-1.5 font-bold text-xs"
              title="Abrir Login Oficial da Deriv em Nova Aba"
            >
              <LogIn className="w-3.5 h-3.5 text-emerald-400" />
              <span>Log in Deriv</span>
              <ExternalLink className="w-3 h-3 text-emerald-400" />
            </a>

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
          className="w-full flex-1 min-h-[78vh] border-none bg-slate-950"
          onLoad={() => setIsLoading(false)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        {/* Status Footer */}
        <div className="px-4 py-2 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Ambiente Seguro • WS Infinity Bot (ID Token: {activeToken})</span>
          </div>
          <span className="text-slate-500 hidden sm:inline">WS Infinity Technology</span>
        </div>
      </div>
    </div>
  );
};

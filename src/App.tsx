import React, { useState } from 'react';
import { NavSection, UserAccount } from './types';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { VideoAulas } from './components/VideoAulas';
import { Plataforma } from './components/Plataforma';
import { FAQSection } from './components/FAQSection';
import { SuporteSection } from './components/SuporteSection';
import { MinhaContaSection } from './components/MinhaContaSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavSection>('inicio');
  const [selectedTutorialLesson, setSelectedTutorialLesson] = useState<number | null>(null);

  // Persistent user account state with user provided Deriv ID / Token
  const [account, setAccount] = useState<UserAccount>({
    name: 'Operador WS Infinity',
    email: 'trader@wsinfinitybot.com',
    broker: 'Deriv.com',
    accountType: 'REAL/DEMO',
    balance: 1250.0,
    apiKey: '33RK5PLoCzbZjQryubB6N',
    isConnected: true,
    accountNumber: 'CR33RK5PL',
    dailyProfit: 42.5,
    stopLossLimit: 30.0,
    stopWinTarget: 20.0,
    martingaleFactor: 1.5,
  });

  // Catch Deriv OAuth Callback parameters if returned to app URL
  React.useEffect(() => {
    const search = window.location.search;
    const hash = window.location.hash;
    const queryString = search || (hash ? hash.substring(1) : '');

    if (queryString && (queryString.includes('token1=') || queryString.includes('acct1='))) {
      try {
        const params = new URLSearchParams(queryString.startsWith('?') ? queryString : `?${queryString}`);
        const token1 = params.get('token1');
        const acct1 = params.get('acct1');

        if (token1) {
          setAccount((prev) => ({
            ...prev,
            apiKey: token1,
            accountNumber: acct1 || prev.accountNumber || 'CONTA DERIV',
            isConnected: true,
          }));
          setActiveTab('plataforma');
          // Clean URL without refresh
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } catch (err) {
        console.error('Erro ao ler parametros OAuth Deriv:', err);
      }
    }
  }, []);

  const handleOpenTutorial = () => {
    setSelectedTutorialLesson(1);
    setActiveTab('aulas');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isConnected={account.isConnected}
        balance={account.balance}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {activeTab === 'inicio' && (
          <div className="space-y-16">
            {/* Hero Banner */}
            <HeroBanner
              onNavigate={setActiveTab}
              onOpenTutorial={handleOpenTutorial}
            />

            {/* Quick Feature Highlights */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-3 mb-10">
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Por que operar com o <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">WS Infinity Bot</span>?
                </h2>
                <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                  Algoritmos quantitativos avançados projetados para máxima precisão no mercado de opções sintéticas da Deriv.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/30">
                    <span className="text-xl font-bold">⚡</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Execução Ultrarrápida</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Conexão direta via WebSockets com a API da Deriv para disparar ordens em milissegundos sem delay.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
                    <span className="text-xl font-bold">🛡️</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Gestão de Risco Inteligente</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Stop Loss, Stop Win e Martingale personalizáveis configurados automaticamente para proteger sua banca.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center mb-4 border border-cyan-500/30">
                    <span className="text-xl font-bold">🎯</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Login Direto por App ID / Token</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Com o ID/Token da Deriv configurado, a plataforma injeta a autorização diretamente no robô sem precisar redirecionar.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'plataforma' && (
          <Plataforma
            account={account}
            setAccount={setAccount}
            onNavigateToAccount={() => setActiveTab('minha-conta')}
          />
        )}

        {activeTab === 'aulas' && (
          <VideoAulas initialLesson={selectedTutorialLesson} />
        )}

        {activeTab === 'minha-conta' && (
          <MinhaContaSection account={account} setAccount={setAccount} />
        )}

        {activeTab === 'suporte' && <SuporteSection />}

        {activeTab === 'faq' && <FAQSection />}
      </main>

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />
    </div>
  );
}

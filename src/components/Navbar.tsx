import React, { useState } from 'react';
import { NavSection } from '../types';
import { WSLogo } from './WSLogo';
import { PlayCircle, Cpu, HelpCircle, User, Home, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: NavSection;
  setActiveTab: (tab: NavSection) => void;
  isConnected: boolean;
  balance: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isConnected,
  balance,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavSection; label: string; icon: React.ReactNode }[] = [
    { id: 'inicio', label: 'Início', icon: <Home className="w-4 h-4" /> },
    { id: 'aulas', label: 'Vídeo Aulas', icon: <PlayCircle className="w-4 h-4" /> },
    { id: 'plataforma', label: 'Plataforma', icon: <Cpu className="w-4 h-4" /> },
    { id: 'suporte', label: 'Suporte', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'conta', label: 'Minha Conta', icon: <User className="w-4 h-4" /> },
  ];

  const handleNavClick = (id: NavSection) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#060913]/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('inicio')}
          className="hover:opacity-95 transition-opacity focus:outline-none text-left"
          id="navbar-logo-btn"
        >
          <WSLogo size="md" />
        </button>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/30 glow-blue'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.id === 'plataforma' && (
                  <span className="flex h-2 w-2 relative ml-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Status Badge & Quick Balance */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono">
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            <span className="text-slate-300 font-medium">
              {isConnected ? 'API Conectada' : 'API Off'}
            </span>
          </div>

          <button
            onClick={() => handleNavClick('plataforma')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-950/60 border border-blue-800/60 hover:border-blue-500 text-blue-200 text-sm font-semibold transition-all hover:bg-blue-900/40"
            id="nav-quick-balance-btn"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0f24] border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between p-3 mb-2 rounded-lg bg-slate-900/90 border border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              <span>Status Deriv API: {isConnected ? 'Ativo' : 'Desconectado'}</span>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold">
              Banca: ${balance.toFixed(2)}
            </span>
          </div>

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-item-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-left transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

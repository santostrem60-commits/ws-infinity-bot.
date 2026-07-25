import React from 'react';
import { NavSection } from '../types';
import { Play, Rocket, ShieldCheck, Zap, TrendingUp, Cpu, Lock } from 'lucide-react';
import { WSLogo } from './WSLogo';

interface HeroBannerProps {
  onNavigate: (tab: NavSection) => void;
  onOpenTutorial: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onNavigate, onOpenTutorial }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#080d1e] via-[#060913] to-[#060913] py-16 sm:py-24 border-b border-slate-800/60">
      {/* Glow Effects Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-8">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-blue-500/30 text-xs font-semibold text-blue-300 shadow-xl">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-cyan-400 font-bold uppercase tracking-wider">WS INFINITY BOT</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Tecnologia Will Santos</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Automatize suas operações de forma{' '}
              <span className="text-gradient-blue underline decoration-blue-500/30 decoration-wavy">
                simples e segura
              </span>.
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              Conecte sua conta, escolha um de nossos robôs otimizados e ative o gerenciamento de risco inteligente. Opere no piloto automático com máxima assertividade e segurança.
            </p>

            {/* CTA Buttons required by prompt */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Button 1: [▶ Assistir Tutorial] */}
              <button
                onClick={onOpenTutorial}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base flex items-center justify-center gap-3 border border-slate-700 hover:border-blue-500/50 shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                id="hero-watch-tutorial-btn"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-400">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <span>▶ Assistir Tutorial</span>
              </button>

              {/* Button 2: [🚀 Abrir Plataforma] */}
              <button
                onClick={() => onNavigate('plataforma')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-base flex items-center justify-center gap-3 shadow-xl shadow-blue-600/30 glow-blue transition-all duration-200 transform hover:-translate-y-0.5"
                id="hero-open-platform-btn"
              >
                <Rocket className="w-5 h-5 text-yellow-300 animate-bounce" />
                <span>🚀 Abrir Plataforma</span>
              </button>
            </div>

            {/* Feature Badges */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-950/60 text-blue-400 border border-blue-800/40">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Stop Loss</div>
                  <div className="text-[11px] text-slate-400">Proteção total</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-950/60 text-cyan-400 border border-blue-800/40">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Alta Velocidade</div>
                  <div className="text-[11px] text-slate-400">API sem delay</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-950/60 text-emerald-400 border border-blue-800/40">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Assertividade</div>
                  <div className="text-[11px] text-slate-400">+89% em testes</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-950/60 text-purple-400 border border-blue-800/40">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">100% Criptografado</div>
                  <div className="text-[11px] text-slate-400">Chaves seguras</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Card - Interactive Platform Preview Emblem */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-[#0a1024] p-6 border border-slate-700/80 shadow-2xl glow-blue">
              {/* Header inside preview card */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <WSLogo size="sm" showText={true} />
                <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Sinais On-line
                </span>
              </div>

              {/* Bot Live Simulator Mockup */}
              <div className="my-6 space-y-4">
                <div className="bg-[#050814] p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                      Robô Selecionado
                    </span>
                    <span className="text-base font-bold text-white flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-blue-400" />
                      WS Infinity Trend v4
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-bold rounded-lg border border-blue-500/30">
                    Otimizado
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-[#050814] rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-medium block">Operações</span>
                    <span className="text-lg font-mono font-bold text-white">28</span>
                  </div>
                  <div className="p-3 bg-[#050814] rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-medium block">Vitórias</span>
                    <span className="text-lg font-mono font-bold text-emerald-400">25 WIN</span>
                  </div>
                  <div className="p-3 bg-[#050814] rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-medium block">Lucro Líquido</span>
                    <span className="text-lg font-mono font-bold text-cyan-400">+$248.50</span>
                  </div>
                </div>

                {/* Live Action Ticker Bar */}
                <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-800/40 flex items-center justify-between text-xs font-mono text-emerald-300">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Última Operação: Volatility 100 Index (CALL)
                  </span>
                  <span className="font-bold text-emerald-400">+$18.40 WIN</span>
                </div>
              </div>

              {/* Quick Action Button Inside Card */}
              <button
                onClick={() => onNavigate('plataforma')}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
                id="hero-card-access-btn"
              >
                <span>Acessar Painel Operacional</span>
                <Rocket className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { NavSection } from '../types';
import { WSLogo } from './WSLogo';
import { ShieldAlert, Send, MessageSquare, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: NavSection) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#040711] border-t border-slate-800/80 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Logo & Description */}
          <div className="md:col-span-5 space-y-4">
            <WSLogo size="md" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Plataforma oficial de automação de operações de trading de alta frequência, robôs otimizados e gerenciamento de risco de Will Santos.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-slate-300">
                Servidores de Sinais Latência: <strong className="text-emerald-400">12ms</strong>
              </span>
            </div>
          </div>

          {/* Quick Links Menu required by prompt */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Menu da Plataforma</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('inicio')} className="hover:text-blue-400 transition-colors" id="footer-link-inicio">
                  • Início
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('aulas')} className="hover:text-blue-400 transition-colors" id="footer-link-aulas">
                  • Vídeo Aulas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('plataforma')} className="hover:text-blue-400 transition-colors" id="footer-link-plataforma">
                  • Plataforma
                </button>
              </li>
            </ul>
          </div>

          {/* Official Community */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Comunidade Will Santos</h4>
            <p className="text-xs text-slate-400">
              Junte-se a milhares de alunos e operadores automatizados no Brasil.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-all"
                title="WhatsApp Suporte"
                id="footer-social-whatsapp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-blue-400 hover:border-blue-500/50 transition-all"
                title="Telegram Canal"
                id="footer-social-telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Financial Risk Notice */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-500 leading-relaxed flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-500/80 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-400 block mb-0.5">Aviso de Risco Financeiro:</strong>
            Operações em mercados de alta volatilidade (opções digitais, índices sintéticos e câmbio) envolvem alto nível de risco e podem resultar na perda do seu capital. Nunca invista dinheiro que você não possa perder. O desempenho passado dos robôs não garante resultados futuros. Teste sempre em conta de demonstração e respeite seu limite de Stop Loss.
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} WS Infinity Bot • Desenvolvido por <strong>Will Santos</strong>. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Tecnologia de Automação de Alta Frequência</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

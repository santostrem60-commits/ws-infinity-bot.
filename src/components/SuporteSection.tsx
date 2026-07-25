import React, { useState } from 'react';
import { MessageSquare, Send, HelpCircle, PhoneCall, CheckCircle2, ShieldCheck, Mail, Clock } from 'lucide-react';

export const SuporteSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Dúvida sobre configuração do Bot');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-xs font-bold text-blue-400">
          <PhoneCall className="w-3.5 h-3.5" />
          CANAL DIRETO
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Suporte Oficial Will Santos</h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Precisa de ajuda para conectar sua conta ou configurar seu robô? Fale diretamente com nossa equipe técnica de atendimento.
        </p>
      </div>

      {/* Main Support Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Instant Messaging Channels */}
        <div className="space-y-6">
          {/* WhatsApp Direct Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/40 shadow-xl space-y-4 hover:border-emerald-500 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Suporte via WhatsApp</h3>
                <p className="text-xs text-slate-400">Atendimento personalizado com analistas Will Santos</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tire suas dúvidas em tempo real, envie prints de configuração e receba auxílio remoto de forma ágil.
            </p>
            <a
              href="https://wa.me/5511999999999?text=Olá!%20Vim%20pela%20plataforma%20WS%20Infinity%20Bot%20e%20preciso%20de%20suporte."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
              id="whatsapp-support-btn"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Chamar no WhatsApp Oficial</span>
            </a>
          </div>

          {/* Telegram Signals & Community Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-blue-500/40 shadow-xl space-y-4 hover:border-blue-500 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30 shrink-0">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Canal VIP Telegram</h3>
                <p className="text-xs text-slate-400">Notificações, atualizações e análises diárias</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Acompanhe novidades de atualizações dos robôs, horários de notícias de alto impacto e avisos da comunidade.
            </p>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
              id="telegram-channel-btn"
            >
              <Send className="w-4 h-4 fill-current" />
              <span>Entrar no Canal do Telegram</span>
            </a>
          </div>

          {/* Support Hours Info */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-center gap-3">
            <Clock className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <strong className="text-white block">Horário de Atendimento Humano:</strong>
              <span>Segunda a Sexta das 08h às 20h • Sábado das 09h às 14h</span>
            </div>
          </div>
        </div>

        {/* Right: Ticket Creation Form */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Mail className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Abrir Chamado Técnico</h3>
              <p className="text-xs text-slate-400">Resposta garantida em até 2 horas úteis</p>
            </div>
          </div>

          {submitted ? (
            <div className="p-6 text-center space-y-4 bg-emerald-950/40 rounded-xl border border-emerald-500/40">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="text-lg font-bold text-white">Chamado Enviado com Sucesso!</h4>
              <p className="text-xs text-slate-300">
                Sua mensagem foi recebida pela equipe do Will Santos. Um especialista responderá no seu e-mail em breve.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-white font-bold rounded-lg"
              >
                Enviar Outro Chamado
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Seu Nome</label>
                <input
                  type="text"
                  required
                  placeholder="Will Santos"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  id="ticket-name-input"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Seu E-mail de Cadastro</label>
                <input
                  type="email"
                  required
                  placeholder="usuario@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  id="ticket-email-input"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Assunto</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  id="ticket-subject-select"
                >
                  <option value="Dúvida sobre configuração do Bot">Dúvida sobre configuração do Bot</option>
                  <option value="Ajuda com chave Token API Deriv">Ajuda com chave Token API Deriv</option>
                  <option value="Dúvida sobre Gerenciamento de Risco">Dúvida sobre Gerenciamento de Risco</option>
                  <option value="Outro assunto">Outro assunto</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Mensagem ou Dúvida</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Descreva sua dúvida com detalhes para acelerar o suporte..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  id="ticket-message-textarea"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all"
                id="submit-support-ticket-btn"
              >
                Enviar Chamado para o Suporte
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

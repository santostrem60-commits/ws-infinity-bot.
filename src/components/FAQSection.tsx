import React, { useState } from 'react';
import { FAQItem } from '../types';
import { HelpCircle, ChevronDown, Search, Shield, Zap, Lock, DollarSign } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const faqList: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'general',
      question: 'Como funciona o WS Infinity Bot?',
      answer:
        'O WS Infinity Bot é uma suíte de robôs algorítmicos desenvolvidos por Will Santos para automatizar análises de mercado, estratégias de volatilidade e pares de moedas em tempo real através da API oficial da corretora.',
    },
    {
      id: 'faq-2',
      category: 'general',
      question: 'Qual valor de banca mínimo recomendado para começar?',
      answer:
        'Recomendamos iniciar com uma banca a partir de $50 USD na conta real para operar com entradas fracionadas de $0.35 ou $1.00. No entanto, você também pode testar ilimitadamente na Conta Demo antes de utilizar capital real.',
    },
    {
      id: 'faq-3',
      category: 'connection',
      question: 'Em quais corretoras o robô funciona?',
      answer:
        'Os robôs funcionam nativamente na corretora Deriv / Binary.com através de Token de API seguro com permissões de negociação automatizada em índices de volatilidade e opções de mercado.',
    },
    {
      id: 'faq-4',
      category: 'connection',
      question: 'É seguro conectar minha Chave de API?',
      answer:
        'Sim, 100% seguro! A chave de API solicitada requer apenas permissão de Leitura e Operações. Jamais solicite ou habilite a permissão de Saque (Withdraw). O seu dinheiro permanece protegido dentro da sua conta na própria corretora.',
    },
    {
      id: 'faq-5',
      category: 'bot',
      question: 'Posso usar o robô pelo celular ou tablet?',
      answer:
        'Sim! A plataforma WS Infinity Bot foi desenvolvida de forma 100% responsiva para navegar e operar diretamente do seu navegador em smartphones (Android, iOS) ou computadores sem necessidade de baixar arquivos pesados.',
    },
    {
      id: 'faq-6',
      category: 'risk',
      question: 'Como funciona a proteção de Stop Loss e Stop Win?',
      answer:
        'No painel da Plataforma você define a sua Meta diária (Stop Win) e o seu Limite de Perda (Stop Loss). Assim que o robô atinge qualquer um dos limites estabelecidos, ele interrompe as operações automaticamente.',
    },
  ];

  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqList.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-xs font-bold text-blue-400">
          <HelpCircle className="w-3.5 h-3.5" />
          SUPORTE E DÚVIDAS
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Perguntas Frequentes
        </h2>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          Tire suas dúvidas sobre a conexão da conta, funcionamento dos robôs e gerenciamento de risco.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-xl mx-auto">
        <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Buscar dúvida ou termo (ex: banca, API, celular)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-xl"
          id="faq-search-input"
        />
      </div>

      {/* Accordions */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
            Nenhuma pergunta encontrada com o termo "{searchQuery}".
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900/90 border-blue-500/60 shadow-xl glow-blue'
                    : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-900/80'
                }`}
                id={`faq-item-${faq.id}`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left font-bold text-base text-white flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

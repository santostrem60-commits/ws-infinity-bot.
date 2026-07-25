import React, { useState } from 'react';
import { UserAccount } from '../types';
import { User, Key, ShieldCheck, DollarSign, Check, Eye, EyeOff, Save, RefreshCw, AlertTriangle } from 'lucide-react';

interface MinhaContaSectionProps {
  account: UserAccount;
  setAccount: React.Dispatch<React.SetStateAction<UserAccount>>;
}

export const MinhaContaSection: React.FC<MinhaContaSectionProps> = ({ account, setAccount }) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(account.apiKey);
  const [brokerInput, setBrokerInput] = useState(account.broker);
  const [accountTypeInput, setAccountTypeInput] = useState<'DEMO' | 'REAL'>(account.accountType);
  const [balanceInput, setBalanceInput] = useState(account.balance);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const isApiKeyValid = apiKeyInput.trim().length > 5;

    setAccount((prev) => ({
      ...prev,
      apiKey: apiKeyInput,
      broker: brokerInput,
      accountType: accountTypeInput,
      balance: balanceInput,
      isConnected: isApiKeyValid,
    }));

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-xs font-bold text-blue-400 mb-2">
            <User className="w-3.5 h-3.5" />
            CONFIGURAÇÃO DA CONTA
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Minha Conta</h2>
          <p className="text-slate-400 text-sm mt-1">
            Gerencie suas credenciais de API, tipo de banca e dados de usuário.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs">
          <span className={`w-2.5 h-2.5 rounded-full ${account.isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
          <span className="text-white font-bold">{account.isConnected ? 'API Conectada' : 'API Desconectada'}</span>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Profile Card */}
        <div className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6 shadow-xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <User className="w-5 h-5 text-blue-400" />
            <span>Dados do Usuário</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Nome Completo</label>
              <input
                type="text"
                value={account.name}
                onChange={(e) => setAccount({ ...account, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                id="account-name-input"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">E-mail Cadastrado</label>
              <input
                type="email"
                value={account.email}
                onChange={(e) => setAccount({ ...account, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                id="account-email-input"
              />
            </div>
          </div>
        </div>

        {/* API Connection Card */}
        <div className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6 shadow-xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Key className="w-5 h-5 text-cyan-400" />
            <span>Conexão com a Corretora (Deriv / Binary API)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Corretora Parceira</label>
              <select
                value={brokerInput}
                onChange={(e) => setBrokerInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                id="account-broker-select"
              >
                <option value="Deriv.com">Deriv.com (Recomendada)</option>
                <option value="Binary.com">Binary.com</option>
                <option value="IQ Option">IQ Option API</option>
                <option value="Exnova">Exnova API</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Tipo de Conta</label>
              <select
                value={accountTypeInput}
                onChange={(e) => setAccountTypeInput(e.target.value as 'DEMO' | 'REAL')}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                id="account-type-select"
              >
                <option value="DEMO">Conta DEMO (Treinamento Sem Risco)</option>
                <option value="REAL">Conta REAL ($ Dólar)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Token / Chave de API da Corretora
            </label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="Cole aqui seu Token de API (ex: a1b2c3d4e5f6g7h8...)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-3.5 pr-12 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
                id="account-api-key-input"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                id="toggle-api-key-visibility-btn"
              >
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Sua chave é salva apenas no seu navegador. Nunca habilite a opção "Withdraw" no token.
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Saldo Inicial da Banca Simulatória ($ USD)
            </label>
            <input
              type="number"
              value={balanceInput}
              onChange={(e) => setBalanceInput(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
              id="account-balance-input"
            />
          </div>
        </div>

        {/* Submit & Status */}
        <div className="flex items-center justify-between pt-4">
          {savedSuccess ? (
            <div className="px-4 py-2 bg-emerald-950 border border-emerald-500/50 text-emerald-400 text-xs font-bold rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Configurações atualizadas e salvas com sucesso!</span>
            </div>
          ) : (
            <div className="text-xs text-slate-400">
              Clique em salvar para atualizar seu saldo e status de API.
            </div>
          )}

          <button
            type="submit"
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all"
            id="save-account-settings-btn"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Alterações</span>
          </button>
        </div>
      </form>
    </div>
  );
};

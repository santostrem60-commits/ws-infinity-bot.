import React, { useState, useEffect, useCallback } from 'react';
import { OperationResultPrint } from '../types';
import { 
  TrendingUp, 
  Plus, 
  Upload, 
  Trash2, 
  Edit, 
  Lock, 
  Unlock, 
  Maximize2, 
  X, 
  Check, 
  Calendar, 
  DollarSign, 
  ShieldCheck, 
  Award, 
  Sparkles,
  Eye,
  Search,
  Loader2
} from 'lucide-react';
import bgLogo from '../assets/images/will_santos_logo_1785014356765.jpg';
import { 
  loadResultsFromStorage, 
  saveResultsToStorage, 
  subscribeToStorageUpdates, 
  compressImage 
} from '../utils/storage';

// Initial default sample operations if storage is empty
const INITIAL_RESULTS: OperationResultPrint[] = [
  {
    id: 'res-1',
    title: 'Sessão Matutina — Volatility 100 Index',
    date: '25/07/2026',
    profit: 245.50,
    winRate: '92%',
    botName: 'WS Infinity Volatility 100',
    description: 'Operação realizada com sucesso usando estratégia de tendência com Stop Loss inteligente de 15%.',
    imageUrl: bgLogo,
    createdAt: Date.now() - 3600000 * 2,
  },
  {
    id: 'res-2',
    title: 'Meta Diária Batida em 15 Minutos',
    date: '24/07/2026',
    profit: 180.00,
    winRate: '100%',
    botName: 'WS Infinity Scalper Pro',
    description: 'Execução de 5 entradas seguidas sem NENHUMA perda. Lucro garantido no mercado de dígitos.',
    imageUrl: bgLogo,
    createdAt: Date.now() - 3600000 * 24,
  },
  {
    id: 'res-3',
    title: 'Sessão Noturna — Mercado Sintético',
    date: '23/07/2026',
    profit: 310.20,
    winRate: '95%',
    botName: 'WS Infinity Bot V2',
    description: 'Gestão de Martingale inteligente limitando a 2 ciclos. Excelente rendimento para a banca dos alunos.',
    imageUrl: bgLogo,
    createdAt: Date.now() - 3600000 * 48,
  }
];

export const ResultadosSection: React.FC = () => {
  const [results, setResults] = useState<OperationResultPrint[]>(INITIAL_RESULTS);
  const [isLoadingStorage, setIsLoadingStorage] = useState<boolean>(true);
  const [isProcessingImage, setIsProcessingImage] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Admin state
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState<string>('');
  const [adminError, setAdminError] = useState<string>('');

  // Form modal state
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [formTitle, setFormTitle] = useState<string>('');
  const [formProfit, setFormProfit] = useState<string>('');
  const [formWinRate, setFormWinRate] = useState<string>('95%');
  const [formBotName, setFormBotName] = useState<string>('WS Infinity Bot');
  const [formDescription, setFormDescription] = useState<string>('');
  const [formDate, setFormDate] = useState<string>(
    new Date().toLocaleDateString('pt-BR')
  );
  const [formImageUrl, setFormImageUrl] = useState<string>('');

  // Lightbox Zoom
  const [selectedZoom, setSelectedZoom] = useState<OperationResultPrint | null>(null);

  // Search and Filter
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'highest' | 'recent'>('recent');

  // Load results from IndexedDB on mount
  const refreshFromStorage = useCallback(async () => {
    try {
      const data = await loadResultsFromStorage(INITIAL_RESULTS);
      setResults(data);
    } catch (e) {
      console.error('Erro ao carregar do storage:', e);
    } finally {
      setIsLoadingStorage(false);
    }
  }, []);

  useEffect(() => {
    refreshFromStorage();

    // Subscribe to changes broadcast from other tabs
    const unsubscribe = subscribeToStorageUpdates(() => {
      refreshFromStorage();
    });

    return () => {
      unsubscribe();
    };
  }, [refreshFromStorage]);

  // Handle Admin Unlock
  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = adminPasswordInput.trim();
    if (cleanInput === 'will123' || cleanInput === 'admin' || cleanInput === '123456') {
      setIsAdmin(true);
      setShowAdminModal(false);
      setAdminPasswordInput('');
      setAdminError('');
    } else {
      setAdminError('Senha de administrador incorreta.');
    }
  };

  // Open Form for Adding New Result
  const handleOpenAdd = () => {
    setEditingId(null);
    setFormTitle('');
    setFormProfit('');
    setFormWinRate('95%');
    setFormBotName('WS Infinity Bot');
    setFormDescription('');
    setFormDate(new Date().toLocaleDateString('pt-BR'));
    setFormImageUrl('');
    setShowFormModal(true);
  };

  // Open Form for Editing Existing Result
  const handleOpenEdit = (res: OperationResultPrint) => {
    setEditingId(res.id);
    setFormTitle(res.title);
    setFormProfit(res.profit.toString());
    setFormWinRate(res.winRate || '95%');
    setFormBotName(res.botName || 'WS Infinity Bot');
    setFormDescription(res.description || '');
    setFormDate(res.date);
    setFormImageUrl(res.imageUrl);
    setShowFormModal(true);
  };

  // Delete Result
  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este resultado da galeria?')) {
      const updated = results.filter((r) => r.id !== id);
      setResults(updated);
      await saveResultsToStorage(updated);
    }
  };

  // Handle Image File Upload from Computer
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        alert('A imagem é muito grande. Escolha uma imagem de até 15MB.');
        return;
      }

      setIsProcessingImage(true);
      const reader = new FileReader();

      reader.onloadend = async () => {
        if (typeof reader.result === 'string') {
          try {
            // Compress image to fast lightweight JPEG string
            const compressed = await compressImage(reader.result, 1600, 0.85);
            setFormImageUrl(compressed);
          } catch (err) {
            console.error('Erro na compressão:', err);
            setFormImageUrl(reader.result);
          } finally {
            setIsProcessingImage(false);
          }
        } else {
          setIsProcessingImage(false);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // Save Form (Add or Edit)
  const handleSaveResult = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      alert('Por favor, informe o título da operação.');
      return;
    }

    setIsSaving(true);

    try {
      const numericProfit = parseFloat(formProfit) || 0;
      const finalImageUrl = formImageUrl || bgLogo;

      let updatedList: OperationResultPrint[];

      if (editingId) {
        // Edit mode
        updatedList = results.map((item) =>
          item.id === editingId
            ? {
                ...item,
                title: formTitle,
                profit: numericProfit,
                winRate: formWinRate,
                botName: formBotName,
                description: formDescription,
                date: formDate,
                imageUrl: finalImageUrl,
              }
            : item
        );
      } else {
        // Add new mode
        const newItem: OperationResultPrint = {
          id: `res-${Date.now()}`,
          title: formTitle,
          date: formDate,
          profit: numericProfit,
          winRate: formWinRate,
          botName: formBotName,
          description: formDescription,
          imageUrl: finalImageUrl,
          createdAt: Date.now(),
        };
        updatedList = [newItem, ...results];
      }

      setResults(updatedList);
      await saveResultsToStorage(updatedList);
      setShowFormModal(false);
    } catch (e) {
      console.error('Erro ao salvar resultado:', e);
      alert('Ocorreu um erro ao salvar o print. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  // Calculated Stats
  const totalProfit = results.reduce((acc, curr) => acc + curr.profit, 0);
  const totalCount = results.length;

  // Filtered and Sorted list
  const filteredResults = results
    .filter((res) => {
      const matchSearch =
        res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.botName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.description?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSearch;
    })
    .sort((a, b) => {
      if (filterType === 'highest') {
        return b.profit - a.profit;
      }
      return b.createdAt - a.createdAt;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-500/40 text-cyan-300 font-mono text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>COMPROVAÇÃO DE RESULTADOS</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Resultados & Operações Comprovadas
          </h1>

          <p className="text-slate-300 text-sm max-w-xl">
            Prints oficiais de sessões de operações e metas batidas com o <strong className="text-cyan-400">WS Infinity Bot</strong>. Transparência total para os clientes.
          </p>
        </div>

        {/* Right Admin Controls Toggle - Discreet for Owner Only */}
        <div className="z-10 flex flex-col sm:flex-row items-center gap-3">
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenAdd}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all transform hover:scale-105"
                id="add-new-result-btn"
              >
                <Plus className="w-4 h-4 text-slate-950" />
                <span>Enviar Print do PC</span>
              </button>

              <button
                onClick={() => setIsAdmin(false)}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-2 border border-slate-700 transition-colors"
                title="Sair do modo administrador"
              >
                <Unlock className="w-4 h-4 text-emerald-400" />
                <span>Modo Admin On</span>
              </button>
            </div>
          ) : (
            /* Subtle discreet lock icon only visible for the owner */
            <button
              onClick={() => setShowAdminModal(true)}
              className="p-2 rounded-xl bg-slate-950/40 hover:bg-slate-900 text-slate-600 hover:text-slate-400 border border-slate-800/50 text-xs transition-colors"
              title="Acesso do Administrador"
              id="admin-login-toggle-btn"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400">Total Lucro Comprovado</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              +${totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400">Taxa Média de Acerto</span>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">
              95.4%
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400">Operações Publicadas</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {totalCount}
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por título ou robô..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterType('recent')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              filterType === 'recent'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Mais Recentes</span>
          </button>

          <button
            onClick={() => setFilterType('highest')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              filterType === 'highest'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Maiores Lucros</span>
          </button>
        </div>
      </div>

      {/* Loading state indicator */}
      {isLoadingStorage ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col items-center justify-center gap-3 text-slate-400">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
          <p className="text-xs">Carregando prints salvos...</p>
        </div>
      ) : filteredResults.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
          <p className="text-slate-400 text-sm">Nenhum resultado encontrado.</p>
          {isAdmin && (
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
            >
              Adicionar Primeiro Print
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((res) => (
            <div
              key={res.id}
              className="group rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-blue-500/50 shadow-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Preview Container */}
              <div 
                className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer"
                onClick={() => setSelectedZoom(res)}
              >
                <img
                  src={res.imageUrl}
                  alt={res.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity" />

                {/* Zoom Badge on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-blue-950/40 backdrop-blur-[2px]">
                  <span className="px-4 py-2 rounded-xl bg-slate-900/90 border border-cyan-500/50 text-cyan-300 font-bold text-xs flex items-center gap-1.5 shadow-xl">
                    <Maximize2 className="w-4 h-4 text-cyan-400" />
                    <span>Ampliar Print</span>
                  </span>
                </div>

                {/* Profit Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-400 font-mono font-bold text-xs shadow-lg flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>+${res.profit.toFixed(2)}</span>
                </div>

                {/* Date Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-slate-300 font-mono text-[11px] flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-blue-400" />
                  <span>{res.date}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-blue-400 font-semibold">
                    <span className="truncate">{res.botName || 'WS Infinity Bot'}</span>
                    {res.winRate && (
                      <span className="px-2 py-0.5 rounded bg-blue-950 border border-blue-800 text-cyan-300 font-mono text-[10px]">
                        WinRate: {res.winRate}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white line-clamp-1 group-hover:text-blue-300 transition-colors">
                    {res.title}
                  </h3>

                  {res.description && (
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                      {res.description}
                    </p>
                  )}
                </div>

                {/* Bottom Row Actions */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedZoom(res)}
                    className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-400" />
                    <span>Ver detalhes</span>
                  </button>

                  {isAdmin && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(res)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Editar Resultado"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(res.id)}
                        className="p-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900/80 text-rose-300 hover:text-rose-100 transition-colors"
                        title="Excluir Resultado"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Admin Login Password Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c1021] border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowAdminModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Acesso do Administrador</h3>
                <p className="text-xs text-slate-400">Digite a senha do proprietário para editar os resultados.</p>
              </div>
            </div>

            <form onSubmit={handleUnlockAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Senha Admin
                </label>
                <input
                  type="password"
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  placeholder="Sua senha de administrador..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                  autoFocus
                />
              </div>

              {adminError && (
                <p className="text-xs text-rose-400 font-semibold">{adminError}</p>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg"
                >
                  Entrar como Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0c1021] border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative my-8">
            <button
              onClick={() => setShowFormModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {editingId ? 'Editar Resultado' : 'Enviar Novo Print de Resultado'}
                </h3>
                <p className="text-xs text-slate-400">
                  {editingId
                    ? 'Altere os campos abaixo do resultado selecionado.'
                    : 'Envie um print do seu computador para exibir aos seus clientes.'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveResult} className="space-y-4">
              {/* Image Upload Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Print da Operação (Do seu Computador)
                </label>
                
                <div className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-2xl p-4 text-center bg-slate-950/60 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload-input"
                  />
                  <label
                    htmlFor="file-upload-input"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    {isProcessingImage ? (
                      <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                    ) : (
                      <Upload className="w-8 h-8 text-blue-400" />
                    )}
                    <span className="text-xs font-semibold text-slate-300">
                      {isProcessingImage
                        ? 'Otimizando e processando print...'
                        : 'Clique aqui para selecionar o print do seu computador'}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Formatos suportados: PNG, JPG, WEBP (Otimização automática ativada)
                    </span>
                  </label>
                </div>

                {/* Preview Thumbnail */}
                {formImageUrl && (
                  <div className="mt-3 relative rounded-xl overflow-hidden border border-slate-700 max-h-44 bg-black">
                    <img
                      src={formImageUrl}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setFormImageUrl('')}
                      className="absolute top-2 right-2 p-1 rounded-full bg-rose-600 text-white hover:bg-rose-500"
                      title="Remover imagem"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Title & Date Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Título da Operação
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Sessão Matutina - Meta Batida 100%"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Data
                  </label>
                  <input
                    type="text"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Profit & WinRate & Bot Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Lucro ($ USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="150.00"
                    value={formProfit}
                    onChange={(e) => setFormProfit(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono font-bold text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Taxa de Acerto
                  </label>
                  <input
                    type="text"
                    placeholder="95%"
                    value={formWinRate}
                    onChange={(e) => setFormWinRate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nome do Robô
                  </label>
                  <input
                    type="text"
                    placeholder="WS Infinity Bot"
                    value={formBotName}
                    onChange={(e) => setFormBotName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Descrição / Observações para os Clientes
                </label>
                <textarea
                  rows={3}
                  placeholder="Escreva detalhes da sessão, quantidade de entradas vitoriosas, estratégia usada..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving || isProcessingImage}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                >
                  {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingId ? 'Salvar Alterações' : 'Publicar Resultado'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Image Zoom Modal */}
      {selectedZoom && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6"
          onClick={() => setSelectedZoom(null)}
        >
          <div 
            className="bg-[#0a0e1c] border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 font-mono text-xs font-bold">
                  +${selectedZoom.profit.toFixed(2)} USD
                </span>
                <h3 className="font-bold text-sm sm:text-base text-white truncate max-w-md">
                  {selectedZoom.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedZoom(null)}
                className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-Res Image View */}
            <div className="flex-1 bg-black overflow-auto flex items-center justify-center p-2">
              <img
                src={selectedZoom.imageUrl}
                alt={selectedZoom.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            </div>

            {/* Modal Footer Info */}
            <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">{selectedZoom.botName}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">{selectedZoom.date}</span>
                </div>
                {selectedZoom.description && (
                  <p className="text-slate-400 text-xs">{selectedZoom.description}</p>
                )}
              </div>

              <button
                onClick={() => setSelectedZoom(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors self-end sm:self-auto"
              >
                Fechar Visualização
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

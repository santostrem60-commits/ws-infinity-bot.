import React, { useState } from 'react';
import { VideoLesson } from '../types';
import { Play, CheckCircle2, Circle, Clock, BookOpen, ChevronRight, Download, Award, Volume2, Maximize, RefreshCw, AlertTriangle } from 'lucide-react';

interface VideoAulasProps {
  onNavigateToPlatform: () => void;
  selectedLessonId?: number | null;
}

export const VideoAulas: React.FC<VideoAulasProps> = ({ onNavigateToPlatform, selectedLessonId }) => {
  const [lessons, setLessons] = useState<VideoLesson[]>([
    {
      id: 1,
      title: 'Vídeo Aula 1',
      subtitle: 'Como conectar sua conta.',
      duration: '08:45 min',
      description: 'Aprenda passo a passo como gerar sua chave API de conexão na corretora Deriv/Binary e sincronizar de forma 100% segura com a plataforma WS Infinity Bot.',
      thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      completed: true,
      topics: [
        'Como criar sua conta na corretora oficial',
        'Onde encontrar o Token de API com permissão de Leitura e Operação',
        'Inserindo a chave no painel "Minha Conta"',
        'Verificação e teste de conexão em tempo real',
      ],
    },
    {
      id: 2,
      title: 'Vídeo Aula 2',
      subtitle: 'Como configurar um Bot.',
      duration: '12:30 min',
      description: 'Entenda os parâmetros dos robôs WS Infinity: escolha do tipo de índice (Volatilidade 10, 25, 50, 100), stake inicial, multiplicador de Martingale/Soros e modo de análise.',
      thumbnail: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      completed: false,
      topics: [
        'Diferença entre Robôs de Tendência (Trend) e Reversão (Sniper)',
        'Definindo o valor da entrada inicial (Stake)',
        'Configuração de Sorosgale e Fator Martingale',
        'Escolha do índice sintético ou par de moedas',
      ],
    },
    {
      id: 3,
      title: 'Vídeo Aula 3',
      subtitle: 'Como iniciar as operações.',
      duration: '10:15 min',
      description: 'Como ligar o robô com segurança, interpretar os gráficos digitais, monitorar as entradas WIN/LOSS e pausar as operações no momento exato.',
      thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      completed: false,
      topics: [
        'Ativação em Conta Demo antes da Conta Real',
        'Monitoramento do Feed de Operações ao Vivo',
        'Pausa manual em momentos de alta volatilidade',
        'Leitura das métricas de P&L acumulado',
      ],
    },
    {
      id: 4,
      title: 'Vídeo Aula 4',
      subtitle: 'Gerenciamento de risco.',
      duration: '15:20 min',
      description: 'O pilar mais importante do trader automatizado: regras de Stop Loss, meta de Stop Win diário, proteção de banca e cálculo de risco proporcional.',
      thumbnail: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      completed: false,
      topics: [
        'A regra de ouro dos 3% a 5% de meta diária',
        'Como configurar o Stop Loss inegociável',
        'Recuperação consciente de perdas',
        'Preservação e rotina de saques semanais',
      ],
    },
  ]);

  const [activeLesson, setActiveLesson] = useState<VideoLesson>(
    lessons.find((l) => l.id === selectedLessonId) || lessons[0]
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTabResource, setActiveTabResource] = useState<'aulas' | 'checklist' | 'downloads'>('aulas');

  const completedCount = lessons.filter((l) => l.completed).length;
  const progressPercentage = Math.round((completedCount / lessons.length) * 100);

  const toggleLessonCompleted = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLessons((prev) =>
      prev.map((l) => (l.id === id ? { ...l, completed: !l.completed } : l))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-xs font-bold text-blue-400 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            CURSO OFICIAL WS INFINITY
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Vídeo Aulas</h2>
          <p className="text-slate-400 mt-2 text-base max-w-xl">
            Aprenda a operar os robôs do absoluto zero ao avançado com o método oficial desenvolvido por Will Santos.
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 min-w-[260px]">
          <div className="flex items-center justify-between text-sm font-semibold mb-2">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-yellow-400" />
              Progresso do Curso
            </span>
            <span className="text-cyan-400 font-mono font-bold">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-cyan-400 h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {completedCount} de {lessons.length} aulas concluídas
          </p>
        </div>
      </div>

      {/* Main Video Showcase & Lesson List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Primary Video Player Component */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
            {/* Custom Video Player Canvas / Frame */}
            <div className="relative aspect-video bg-slate-950 flex items-center justify-center">
              {!isPlaying ? (
                <div className="relative w-full h-full">
                  <img
                    src={activeLesson.thumbnail}
                    alt={activeLesson.subtitle}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Centered Play Button */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="w-20 h-20 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-2xl shadow-blue-600/50 glow-blue transition-all transform hover:scale-110 focus:outline-none"
                      id={`play-video-btn-${activeLesson.id}`}
                    >
                      <Play className="w-9 h-9 fill-current ml-1" />
                    </button>
                    <span className="text-white font-bold text-sm bg-slate-950/80 px-4 py-1.5 rounded-full border border-slate-800">
                      ▶ Assistir {activeLesson.title} • {activeLesson.duration}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full bg-black flex flex-col justify-between p-4">
                  {/* Simulated HTML5 Video Playback Controls */}
                  <div className="w-full h-full flex flex-col items-center justify-center relative">
                    <div className="p-8 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/40 animate-pulse">
                        <Play className="w-8 h-8 fill-current" />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {activeLesson.title} - {activeLesson.subtitle}
                      </h3>
                      <p className="text-sm text-slate-400 max-w-md mx-auto">
                        [Executando reprodutor de vídeo em alta definição WS Infinity Bot]
                      </p>
                      <button
                        onClick={() => setIsPlaying(false)}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-lg border border-slate-700"
                      >
                        Pausar / Voltar para Capa
                      </button>
                    </div>
                  </div>

                  {/* Fake Player Bar */}
                  <div className="bg-slate-900/90 backdrop-blur p-3 rounded-xl border border-slate-800 flex items-center gap-4 text-xs font-mono">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="text-blue-400 hover:text-white">
                      {isPlaying ? 'PAUSE' : 'PLAY'}
                    </button>
                    <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-2/5" />
                    </div>
                    <span className="text-slate-400">03:42 / {activeLesson.duration}</span>
                    <Volume2 className="w-4 h-4 text-slate-400" />
                    <Maximize className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              )}
            </div>

            {/* Video Info Header */}
            <div className="p-6 bg-slate-900/90 border-t border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider block">
                    {activeLesson.title}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">{activeLesson.subtitle}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => toggleLessonCompleted(activeLesson.id, e)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 border transition-all ${
                      activeLesson.completed
                        ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                    id={`toggle-complete-btn-${activeLesson.id}`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${activeLesson.completed ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span>{activeLesson.completed ? 'Aula Concluída' : 'Marcar como Concluída'}</span>
                  </button>

                  <button
                    onClick={onNavigateToPlatform}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30"
                    id="video-lesson-open-platform-btn"
                  >
                    <span>Abrir Plataforma</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">{activeLesson.description}</p>

              {/* Topics Included */}
              <div className="pt-4 border-t border-slate-800/80">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Tópicos Abordados nesta Aula:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeLesson.topics.map((topic, index) => (
                    <div key={index} className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="w-5 h-5 rounded-full bg-blue-950 text-blue-400 flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
                        {index + 1}
                      </span>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Complete Lesson List with Required Titles */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <span>Grade de Aulas ({lessons.length})</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">WS Infinity Bot</span>
          </div>

          <div className="space-y-3">
            {lessons.map((lesson) => {
              const isSelected = lesson.id === activeLesson.id;
              return (
                <div
                  key={lesson.id}
                  onClick={() => {
                    setActiveLesson(lesson);
                    setIsPlaying(false);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-slate-900 border-blue-500/80 shadow-xl glow-blue'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                  id={`lesson-card-${lesson.id}`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Thumbnail / Play Status */}
                    <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-950 border border-slate-800">
                      <img src={lesson.thumbnail} alt={lesson.subtitle} className="w-full h-full object-cover opacity-70" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-900/80 text-slate-300'}`}>
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Lesson Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold font-mono text-blue-400">
                          {lesson.title}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {lesson.duration}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white truncate mt-0.5">
                        {lesson.subtitle}
                      </h4>

                      {/* Explicit ▶ Assistir Button as requested by prompt */}
                      <div className="mt-2 flex items-center justify-between">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                              : 'bg-blue-950/80 text-blue-300 hover:bg-blue-900 hover:text-white border border-blue-800/40'
                          }`}
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>▶ Assistir</span>
                        </span>

                        <button
                          onClick={(e) => toggleLessonCompleted(lesson.id, e)}
                          className="text-slate-400 hover:text-emerald-400 p-1"
                          title="Alternar conclusão"
                        >
                          {lesson.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-600" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Download Resources Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-950/40 to-slate-900 border border-blue-800/30 text-xs text-slate-300 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold">
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Materiais Complementares (PDF)</span>
            </div>
            <p className="text-slate-400">
              Baixe a planilha de gerenciamento de risco e o manual de configuração de API.
            </p>
            <button
              onClick={() => alert('Download do Guia Oficial WS Infinity Bot iniciado!')}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2"
              id="download-guide-pdf-btn"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Guia em PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

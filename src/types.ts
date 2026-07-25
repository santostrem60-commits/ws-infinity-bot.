export type NavSection = 'inicio' | 'aulas' | 'plataforma' | 'resultados' | 'suporte' | 'conta';

export interface OperationResultPrint {
  id: string;
  title: string;
  date: string;
  profit: number;
  winRate?: string;
  botName?: string;
  description?: string;
  imageUrl: string;
  createdAt: number;
}

export interface VideoLesson {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  completed: boolean;
  topics: string[];
}

export interface BotStrategy {
  id: string;
  name: string;
  description: string;
  winRate: string;
  recommendedRisk: string;
  indicator: string;
  type: 'binary' | 'forex' | 'volatility';
  status: 'active' | 'standby';
}

export interface TradeOperation {
  id: string;
  time: string;
  asset: string;
  type: 'CALL' | 'PUT';
  stake: number;
  profit: number;
  status: 'WIN' | 'LOSS' | 'PENDING';
  botName: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'connection' | 'bot' | 'risk';
}

export interface UserAccount {
  name: string;
  email: string;
  broker: string;
  accountType: 'DEMO' | 'REAL';
  balance: number;
  apiKey: string;
  isConnected: boolean;
  dailyProfit: number;
  stopLossLimit: number;
  stopWinTarget: number;
  martingaleFactor: number;
}

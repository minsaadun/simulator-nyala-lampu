export type ScreenType = 'welcome' | 'mission' | 'energy' | 'series-parallel' | 'conductor-tester' | 'notes' | 'quiz' | 'result';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
  tip?: string;
}

export interface CircuitComponentInfo {
  id: string;
  name: string;
  nameMalay: string;
  functionMalay: string;
  symbolDescription: string;
  symbolSvg: string;
  realWorldNote: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  icon: string;
  type: 'conductor' | 'insulator';
  description: string;
  why: string;
}

export interface MissionStep {
  step: number;
  title: string;
  instruction: string;
  statusText: string;
  tip: string;
}

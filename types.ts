
export enum UserType {
  PF = 'Pessoa Física',
  PJ = 'Pessoa Jurídica'
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  document: string; // CPF or CNPJ
  isVerified: boolean;
}

export enum DispatchStatus {
  PENDING_ACTION = 'Pendente de Ação',
  INFORMATIVE = 'Informativo',
  DECISION = 'Decisão',
  ARCHIVED = 'Arquivado'
}

export interface Dispatch {
  code: string;
  date: string;
  description: string;
  status: DispatchStatus;
  actionGuidance: string; // "O que fazer?"
  isCritical?: boolean;
}

export interface Deadline {
  id: string;
  title: string;
  date: string; // ISO string
  dispatchId?: string; // Optional link to a specific dispatch
  isCompleted: boolean;
}

export interface Process {
  id: string;
  inpiNumber: string;
  brandName: string;
  niceClass: string; // Classification (e.g., NCL 35)
  owner: string;
  specification: string;
  status: string;
  depositDate?: string;
  dispatches: Dispatch[];
  deadlines: Deadline[];
  lastUpdate: string;
}

export interface Article {
  id: number;
  title: string;
  summary: string;
  content: string; // HTML content
}

export interface Specialist {
  id: string;
  name: string;
  oab: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  priceStart: string;
  imageUrl?: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'specialist';
  timestamp: string;
  isRead?: boolean;
}

export interface Chat {
  id: string;
  specialistId: string;
  messages: Message[];
  lastUpdate: string;
}

export interface InpiMockResponse {
  number: string;
  brand: string;
  class: string;
  owner: string;
  specification: string;
  status: string;
  dispatches: Dispatch[];
}
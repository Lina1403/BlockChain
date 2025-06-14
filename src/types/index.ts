export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface DNASequence {
  id: string;
  sequence: string;
  originalFileName: string;
  fileSize: number;
  fileType: string;
  encodingTime: number;
  compressionRatio: number;
  checksum: string;
  timestamp: string;
  transactionId?: string;
  nftId?: string;
}

export interface LabNetwork {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'busy' | 'offline';
  capacity: number;
  successRate: number;
  averageTime: number;
}

export interface NetworkMetrics {
  tps: number;
  consensusTime: number;
  energyConsumption: number;
  activeNodes: number;
  totalTransactions: number;
}

export interface GovernanceProposal {
  id: string;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  status: 'active' | 'passed' | 'rejected';
  endDate: string;
}
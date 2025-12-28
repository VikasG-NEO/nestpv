import { useState } from 'react';

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  category: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
}

export function useTransactions(limitCount: number = 50) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addTransaction = async (
    type: 'credit' | 'debit',
    amount: number,
    description: string,
    category: string = 'Other'
  ) => {
    // Placeholder - no backend connected
    return { success: false, error: 'No backend connected' };
  };

  const stats = {
    totalReceived: 0,
    totalSent: 0,
    count: 0,
  };

  return { transactions, loading, error, addTransaction, stats };
}

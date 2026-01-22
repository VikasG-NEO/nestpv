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

export function useTransactions(_limitCount: number = 50) {
  const [transactions] = useState<Transaction[]>([]);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const addTransaction = async (
    _type: 'credit' | 'debit',
    _amount: number,
    _description: string,
    _category: string = 'Other'
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

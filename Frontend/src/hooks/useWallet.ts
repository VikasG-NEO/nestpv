import { useState } from 'react';

export interface WalletData {
  balance: number;
  currency: string;
  lastUpdated: Date;
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletData>({
    balance: 0,
    currency: 'INR',
    lastUpdated: new Date(),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMoney = async (amount: number) => {
    // Placeholder - no backend connected
    return { success: false, error: 'No backend connected' };
  };

  const withdrawMoney = async (amount: number) => {
    // Placeholder - no backend connected
    return { success: false, error: 'No backend connected' };
  };

  return { wallet, loading, error, addMoney, withdrawMoney };
}

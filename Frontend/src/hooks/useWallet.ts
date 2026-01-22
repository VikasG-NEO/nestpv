import { useState } from 'react';

export interface WalletData {
  balance: number;
  currency: string;
  lastUpdated: Date;
}

export function useWallet() {
  const [wallet] = useState<WalletData>({
    balance: 0,
    currency: 'INR',
    lastUpdated: new Date(),
  });
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const addMoney = async (_amount: number) => {
    // Placeholder - no backend connected
    return { success: false, error: 'No backend connected' };
  };

  const withdrawMoney = async (_amount: number) => {
    // Placeholder - no backend connected
    return { success: false, error: 'No backend connected' };
  };

  return { wallet, loading, error, addMoney, withdrawMoney };
}

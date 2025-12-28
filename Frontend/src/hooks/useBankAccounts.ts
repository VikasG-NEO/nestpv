import { useState } from 'react';

export interface BankAccount {
  id: string;
  accountHolder: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  isVerified: boolean;
  isPrimary: boolean;
  addedAt: Date;
}

const defaultAccounts: BankAccount[] = []; // Added defaultAccounts as it's used in the change

export function useBankAccounts() {
  const [accounts] = useState<BankAccount[]>(defaultAccounts);
  // const [loading] = useState(false);
  // const [error] = useState<string | null>(null);

  const addAccount = async (accountData: any) => {
    // Placeholder
    console.log("Adding account:", accountData);
  };

  const removeAccount = async () => {
    // Placeholder - no backend connected
    return { success: false, error: 'No backend connected' };
  };

  return { accounts, loading: false, error: null, addAccount, removeAccount };
}

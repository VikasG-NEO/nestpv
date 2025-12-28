import { useState } from 'react';

export interface Scheme {
  id: string;
  name: string;
  description: string;
  category: string;
  eligibility: string;
  benefits: string;
  status: 'available' | 'applied' | 'approved' | 'rejected';
}

const defaultSchemes: Scheme[] = [
  {
    id: '1',
    name: 'Health Insurance',
    description: 'Comprehensive health coverage for members',
    category: 'Insurance',
    eligibility: 'All registered members',
    benefits: 'Up to ₹5 Lakh coverage',
    status: 'available',
  },
  {
    id: '2',
    name: 'Education Loan',
    description: 'Low interest loans for education',
    category: 'Education',
    eligibility: 'Members with children',
    benefits: 'Up to ₹10 Lakh at 4% interest',
    status: 'available',
  },
  {
    id: '3',
    name: 'Housing Scheme',
    description: 'Affordable housing assistance',
    category: 'Housing',
    eligibility: 'Members for 2+ years',
    benefits: 'Subsidy up to ₹2.5 Lakh',
    status: 'available',
  },
];

export function useSchemes() {
  const [schemes] = useState<Scheme[]>(defaultSchemes);
  // const [loading] = useState(false);
  // const [error] = useState<string | null>(null);

  const applyForScheme = async () => {
    // Placeholder - no backend connected
    return { success: false, error: 'No backend connected' };
  };

  const stats = {
    available: schemes.filter(s => s.status === 'available').length,
    applied: schemes.filter(s => s.status === 'applied').length,
    approved: schemes.filter(s => s.status === 'approved').length,
  };

  return { schemes, loading: false, error: null, stats, applyForScheme };
}

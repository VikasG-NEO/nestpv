import { useState } from 'react';

export type TargetGroup = 'labour' | 'auto' | 'other';

export interface Scheme {
  id: string;
  name: string;
  hindiName?: string;
  description: string;
  category: string;
  benefits: string[];
  cost: string;
  targetGroup: TargetGroup;
  status: 'available' | 'coming_soon';
  actionUrl?: string; // URL to redirect to
  actionType: 'external' | 'internal'; // 'external' opens new tab, 'internal' uses NestUnion flow
}

const defaultSchemes: Scheme[] = [
  // --- LABOUR SCHEMES ---
  {
    id: 'eshram-labour',
    name: 'E-Shram Card',
    hindiName: 'ई-श्रम कार्ड',
    description: 'National Database of Unorganized Workers',
    category: 'Identity',
    benefits: ['₹ 2 Lakh Accident Insurance', 'Pension after 60 years'],
    cost: 'Free',
    targetGroup: 'labour',
    status: 'available',
    actionUrl: 'https://register.eshram.gov.in/',
    actionType: 'external'
  },
  {
    id: 'pmsby-labour',
    name: 'PMSBY',
    hindiName: 'अपयात विमा',
    description: 'Accident Insurance Scheme',
    category: 'Insurance',
    benefits: ['₹ 2 Lakh Insurance Cover'],
    cost: '₹ 20 - ₹ 30 / year',
    targetGroup: 'labour',
    status: 'available',
    actionUrl: 'https://www.jansuraksha.gov.in/Forms-PMSBY.aspx',
    actionType: 'external'
  },
  {
    id: 'pmjjby-labour',
    name: 'PMJJBY',
    hindiName: 'जीवन विमा',
    description: 'Life Insurance Scheme',
    category: 'Insurance',
    benefits: ['₹ 2 Lakh Life Cover'],
    cost: '₹ 436 / year',
    targetGroup: 'labour',
    status: 'available',
    actionUrl: 'https://www.jansuraksha.gov.in/Forms-PMJJBY.aspx',
    actionType: 'external'
  },
  {
    id: 'apy-labour',
    name: 'Atal Pension Yojana',
    hindiName: 'अटल पेंशन योजना',
    description: 'Guaranteed Pension',
    category: 'Pension',
    benefits: ['₹1,000 - ₹5,000 Monthly Pension'],
    cost: 'Varies by age',
    targetGroup: 'labour',
    status: 'available',
    actionUrl: 'https://enps.nsdl.com/eNPS/NationalPensionSystem.html',
    actionType: 'external'
  },

  // --- AUTO SCHEMES ---
  {
    id: 'pmsby-auto',
    name: 'PMSBY',
    hindiName: 'अपयात विमा',
    description: 'Accident Insurance Scheme',
    category: 'Insurance',
    benefits: ['₹ 2 Lakh Accident Insurance'],
    cost: '₹ 20 - ₹ 30 / year',
    targetGroup: 'auto',
    status: 'available',
    actionUrl: 'https://www.jansuraksha.gov.in/Forms-PMSBY.aspx',
    actionType: 'external'
  },
  {
    id: 'pmjjby-auto',
    name: 'PMJJBY',
    hindiName: 'जीवन विमा',
    description: 'Life Insurance Scheme',
    category: 'Insurance',
    benefits: ['₹ 2 Lakh Life Cover'],
    cost: '₹ 436 / year',
    targetGroup: 'auto',
    status: 'available',
    actionUrl: 'https://www.jansuraksha.gov.in/Forms-PMJJBY.aspx',
    actionType: 'external'
  },
  {
    id: 'apy-auto',
    name: 'Atal Pension Yojana',
    hindiName: 'अटल पेंशन योजना',
    description: 'Pension after retirement',
    category: 'Pension',
    benefits: ['Pension after retirement'],
    cost: 'Varies by age',
    targetGroup: 'auto',
    status: 'available',
    actionUrl: 'https://enps.nsdl.com/eNPS/NationalPensionSystem.html',
    actionType: 'external'
  },
  {
    id: 'driver-welfare',
    name: 'Driver Welfare',
    hindiName: 'चालक कल्याण योजना',
    description: 'Special assistance',
    category: 'Welfare',
    benefits: ['Special Financial Assistance'],
    cost: 'Free',
    targetGroup: 'auto',
    status: 'available',
    actionUrl: 'https://nestunion.in/contact', // Redirect to NestUnion contact
    actionType: 'internal'
  },

  // --- OTHER ---
  {
    id: 'street-vendor',
    name: 'Street Vendors',
    description: 'PM SVANidhi Scheme',
    category: 'Business',
    benefits: ['Working Capital Loan'],
    cost: '',
    targetGroup: 'other',
    status: 'coming_soon',
    actionType: 'external'
  },
  {
    id: 'domestic-workers',
    name: 'Domestic Workers',
    description: 'Social Security',
    category: 'Welfare',
    benefits: ['Health & Maternity Benefits'],
    cost: '',
    targetGroup: 'other',
    status: 'coming_soon',
    actionType: 'external'
  }

];

export function useSchemes() {
  const [schemes] = useState<Scheme[]>(defaultSchemes);

  const applyForScheme = async (scheme: any) => {
    // This is now handled mostly by frontend redirection
    console.log("Applying/Redirecting for:", scheme.name);
    return { success: true };
  };

  const stats = {
    available: schemes.filter(s => s.status === 'available').length,
    comingSoon: schemes.filter(s => s.status === 'coming_soon').length,
  };

  return { schemes, loading: false, error: null, stats, applyForScheme };
}


import { useAuth } from './useAuth';

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  age?: number;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  photo?: string;
  community?: string;
  nestId?: string;
  memberId?: string;
  createdAt?: string;
  isDocumentVerified?: boolean;
  role?: string;
  zip?: string;
}

export function useUserProfile() {
  const { user, loading, fetchProfile } = useAuth();

  // Map User to UserProfile
  const profile: UserProfile | null = user ? {
    fullName: user.displayName,
    email: user.email,
    phone: user.phoneNumber,
    photo: user.photoURL,
    nestId: user.nestId,
    community: user.community,
    isDocumentVerified: user.isDocumentVerified,
    role: user.role,
    address: user.address,
    city: user.city,
    state: user.state,
    zip: user.zip,
    country: user.country
  } : null;

  return { profile, loading, error: null, refetchProfile: fetchProfile };
}

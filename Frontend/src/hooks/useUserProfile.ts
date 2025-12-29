
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
}

export function useUserProfile() {
  const { user, loading } = useAuth();

  // Map User to UserProfile
  const profile: UserProfile | null = user ? {
    fullName: user.displayName,
    email: user.email,
    phone: user.phoneNumber,
    photo: user.photoURL,
    nestId: user.nestId,
    community: user.community,
    isDocumentVerified: user.isDocumentVerified
    // Other fields might need actual fetching if not in User.
    // But for "Overview", these basic ones are used.
    // If we need age/gender etc, we might need to store them in User or fetch here.
    // For now, we reuse User data which came from /users/profile anyway.
  } : null;

  return { profile, loading, error: null };
}

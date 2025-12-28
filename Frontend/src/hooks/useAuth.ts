
import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  phoneNumber: string;
  role?: string;
  nestId?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const profile = await fetchAPI('/users/profile');
      if (profile) {
        // Map backend user to User interface
        setUser({
          uid: profile._id || profile.id,
          email: profile.email,
          displayName: profile.fullName || profile.name,
          photoURL: profile.avatar || profile.photo,
          emailVerified: profile.isEmailVerified || false,
          phoneNumber: profile.phone || profile.mobile,
          role: profile.role,
          nestId: profile.nestId
        });
      }
    } catch (error) {
      console.error("Failed to fetch profile", error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (res && res.access_token) {
        localStorage.setItem('token', res.access_token);
        await fetchProfile();
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: any) => {
    setLoading(true);
    try {
      await fetchAPI('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      // Auto login after register? Or just return success.
      // Usually prompt to login or auto-login.
      // For now, let's try to auto-login if backend returns token, else just success.
      // NestJS auth service register returns created user, not token usually.
      // So we might need to ask user to login.

    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    // Implement Google Auth if backend supports it. For now, throw.
    throw new Error('Google Sign-In not implemented yet.');
  };

  const signOut = async () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
  };
}

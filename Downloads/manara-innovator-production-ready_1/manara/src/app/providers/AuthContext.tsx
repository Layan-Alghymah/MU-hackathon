import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AuthSession, LoginCredentials, ExternalRegistrationPayload } from '@/features/auth/types';
import { authService } from '@/features/auth/services/authService';
import { profileService } from '@/features/profile/services/profileService';

interface AuthContextValue {
  session: AuthSession | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  registerExternal: (payload: ExternalRegistrationPayload) => Promise<void>;
  logout: () => Promise<void>;
  /**
   * Re-fetches the current user's identity and merges it into the active
   * session (persisted + reflected in React state), so the sidebar/header
   * picks up changes made elsewhere (e.g. a profile edit) without
   * requiring a full re-login. No-ops if there's no active session.
   */
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authService
      .getSession()
      .then(setSession)
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const newSession = await authService.login(credentials);
    setSession(newSession);
  };

  const registerExternal = async (payload: ExternalRegistrationPayload) => {
    const newSession = await authService.registerExternal(payload);
    setSession(newSession);
  };

  const logout = async () => {
    await authService.logout();
    setSession(null);
  };

  const refreshSession = async () => {
    if (!session) return;
    const freshUser = await profileService.getCurrentUser();
    const updated: AuthSession = { ...session, user: freshUser };
    await authService.persistSession(updated);
    setSession(updated);
  };

  return (
    <AuthContext.Provider value={{ session, isLoading, login, registerExternal, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

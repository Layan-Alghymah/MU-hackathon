import type { AuthSession, LoginCredentials, ForgotPasswordPayload, ExternalRegistrationPayload, AuthErrorCode } from '../types';
import { MOCK_CURRENT_USER } from '@/services/mock/data';
import { findMockAccountByEmail, addMockAccount } from '@/services/mock/auth.mock';
import { mockDelay, generateId } from '@/services/mock/utils';

/**
 * authService abstraction.
 *
 * No auth provider has been chosen yet (Auth0, Firebase, custom backend...).
 * Components must only depend on this interface. Swap `MockAuthService` for
 * a real implementation in Phase 10 without touching any component or page.
 *
 * IMPORTANT: this service only ever throws `AuthError` with a typed
 * `AuthErrorCode` — it never contains Arabic (or any other UI-facing)
 * strings. The UI maps codes to messages via
 * `features/auth/errorMessages.ts`.
 */
export interface AuthService {
  login(credentials: LoginCredentials): Promise<AuthSession>;
  forgotPassword(payload: ForgotPasswordPayload): Promise<{ success: boolean }>;
  registerExternal(payload: ExternalRegistrationPayload): Promise<AuthSession>;
  getSession(): Promise<AuthSession | null>;
  /** Persists an already-built session (e.g. the current session with a refreshed `user`). Does not mutate/validate it — the caller owns that. */
  persistSession(session: AuthSession): Promise<void>;
  logout(): Promise<void>;
}

export class AuthError extends Error {
  code: AuthErrorCode;
  constructor(code: AuthErrorCode) {
    super(code);
    this.name = 'AuthError';
    this.code = code;
  }
}

const SESSION_STORAGE_KEY = 'manara.mockSession';

class MockAuthService implements AuthService {
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    await mockDelay(undefined, 600);

    const account = findMockAccountByEmail(credentials.email);

    if (!account) {
      throw new AuthError('UNKNOWN_EMAIL');
    }
    if (account.password !== credentials.password) {
      throw new AuthError('INVALID_CREDENTIALS');
    }

    const session: AuthSession = { user: MOCK_CURRENT_USER, token: 'mock-token' };
    this.persist(session);
    return session;
  }

  async forgotPassword(payload: ForgotPasswordPayload): Promise<{ success: boolean }> {
    if (!payload.email) {
      throw new AuthError('VALIDATION_ERROR');
    }
    return mockDelay({ success: true }, 700);
  }

  async registerExternal(payload: ExternalRegistrationPayload): Promise<AuthSession> {
    await mockDelay(undefined, 600);

    if (findMockAccountByEmail(payload.email)) {
      throw new AuthError('EMAIL_ALREADY_REGISTERED');
    }

    addMockAccount({ email: payload.email, password: payload.password });

    const session: AuthSession = {
      user: {
        id: generateId('external-user'),
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
      },
      token: generateId('mock-token-external'),
    };
    this.persist(session);
    return session;
  }

  async getSession(): Promise<AuthSession | null> {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthSession;
    } catch {
      return null;
    }
  }

  async persistSession(session: AuthSession): Promise<void> {
    this.persist(session);
  }

  async logout(): Promise<void> {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    return mockDelay(undefined, 200);
  }

  private persist(session: AuthSession) {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  }
}

export const authService: AuthService = new MockAuthService();

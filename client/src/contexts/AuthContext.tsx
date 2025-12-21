import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { name: string; role: string; email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Token refresh interval (14 minutes for 15-minute access tokens)
const TOKEN_REFRESH_INTERVAL = 14 * 60 * 1000;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; role: string; email: string } | null>(null);
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);
  const refreshPromiseRef = useRef<Promise<boolean> | null>(null);
  const isMountedRef = useRef(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

  const clearRefreshTimer = useCallback(() => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
  }, []);

  // Safe state setters that check if component is still mounted
  const safeSetIsAuthenticated = useCallback((value: boolean) => {
    if (isMountedRef.current) {
      setIsAuthenticated(value);
    }
  }, []);

  const safeSetUser = useCallback((value: { name: string; role: string; email: string } | null) => {
    if (isMountedRef.current) {
      setUser(value);
    }
  }, []);

  const safeSetIsLoading = useCallback((value: boolean) => {
    if (isMountedRef.current) {
      setIsLoading(value);
    }
  }, []);

  const refreshToken = useCallback(async (): Promise<boolean> => {
    // Prevent race conditions: if already refreshing, return existing promise
    if (refreshPromiseRef.current) {
      return refreshPromiseRef.current;
    }

    const refreshPromise = (async () => {
      try {
        const response = await fetch(`${API_URL}/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Token refresh failed');
        }

        const { user: userData } = await response.json();

        safeSetIsAuthenticated(true);
        safeSetUser(userData);

        scheduleTokenRefresh();

        return true;
      } catch (error) {
        console.error('Token refresh error:', error);
        safeSetIsAuthenticated(false);
        safeSetUser(null);
        clearRefreshTimer();
        return false;
      } finally {
        // Clear the promise reference after completion
        refreshPromiseRef.current = null;
      }
    })();

    // Store the promise so concurrent calls can reuse it
    refreshPromiseRef.current = refreshPromise;
    return refreshPromise;
  }, [API_URL, clearRefreshTimer, safeSetIsAuthenticated, safeSetUser]);


  const scheduleTokenRefresh = useCallback(() => {
    clearRefreshTimer();
    refreshTimerRef.current = setTimeout(() => {
      refreshToken();
    }, TOKEN_REFRESH_INTERVAL);
  }, [clearRefreshTimer, refreshToken]);

  const checkAuth = useCallback(async (): Promise<boolean> => {
    // Create abort controller to cancel fetch if component unmounts
    const abortController = new AbortController();
    
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error('Not authenticated');
      }

      const { user: userData } = await response.json();

      safeSetIsAuthenticated(true);
      safeSetUser(userData);

      // Start token refresh cycle
      scheduleTokenRefresh();

      return true;
    } catch (error) {
      // Don't process error if request was aborted (component unmounted)
      if (error instanceof Error && error.name === 'AbortError') {
        return false;
      }

      const mockUser = sessionStorage.getItem('jci_mock_user');
      if (mockUser && import.meta.env.DEV) {
        try {
          const userData = JSON.parse(mockUser);
          safeSetIsAuthenticated(true);
          safeSetUser(userData);
          return true;
        } catch (e) {
          sessionStorage.removeItem('jci_mock_user');
        }
      }

      safeSetIsAuthenticated(false);
      safeSetUser(null);
      return false;
    } finally {
      safeSetIsLoading(false);
    }
  }, [API_URL, scheduleTokenRefresh, safeSetIsAuthenticated, safeSetUser, safeSetIsLoading]);

  // Initialize auth on mount
  useEffect(() => {
    isMountedRef.current = true;
    checkAuth();

    // Handle tab visibility: refresh auth when user returns to tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isAuthenticated) {
        // User returned to tab - verify token is still valid
        checkAuth();
      }
    };

    // Handle window focus: refresh auth when window gains focus
    const handleFocus = () => {
      if (isAuthenticated) {
        // Window gained focus - verify token is still valid
        checkAuth();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      isMountedRef.current = false;
      clearRefreshTimer();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [checkAuth, clearRefreshTimer, isAuthenticated]);

  const login = async (email: string, password: string) => {
    try { 
      // Call backend API with credentials
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      // Server sets HTTP-only cookies (accessToken, refreshToken)
      // Get user data from response
      const { user: userData } = await response.json();

      // Update state
      safeSetIsAuthenticated(true);
      safeSetUser(userData);

      // Start token refresh cycle
      scheduleTokenRefresh();
      
    } catch (error) {
      // Development fallback: Mock authentication (only in dev mode)
      if (import.meta.env.DEV) {
        console.warn('Backend not available, using mock auth:', error);
        
        if (email === 'admin@jci.com' && password === 'admin123') {
          const userData = { 
            name: 'Admin User', 
            role: 'admin',
            email: 'admin@jci.com'
          };

          safeSetIsAuthenticated(true);
          safeSetUser(userData);

          sessionStorage.setItem('jci_mock_user', JSON.stringify(userData));
        } else {
          throw new Error('Invalid credentials');
        }
      } else {
        throw error;
      }
    }
  };

  const logout = async () => {
    try {
      // Call backend logout endpoint (clears HTTP-only cookies)
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {

      safeSetIsAuthenticated(false);
      safeSetUser(null);
      clearRefreshTimer();

      // Clear dev mock data
      if (import.meta.env.DEV) {
        sessionStorage.removeItem('jci_mock_user');
      }
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

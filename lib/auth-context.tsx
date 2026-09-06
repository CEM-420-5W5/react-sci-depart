'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
  playerId: number | null;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = () => {
    const storedToken = sessionStorage.getItem('token');
    const storedUsername = sessionStorage.getItem('playerName');
    const storedPlayerId = sessionStorage.getItem('playerId');

    if (storedToken) {
      setToken(storedToken);
      setUsername(storedUsername);
      setPlayerId(storedPlayerId ? parseInt(storedPlayerId) : null);
      setIsAuthenticated(true);
    } else {
      setToken(null);
      setUsername(null);
      setPlayerId(null);
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('playerId');
    sessionStorage.removeItem('playerName');
    
    setToken(null);
    setUsername(null);
    setPlayerId(null);
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, token, playerId, logout, checkAuth }}>
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

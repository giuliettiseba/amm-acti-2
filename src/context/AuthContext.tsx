import {createContext, useContext} from 'react';
import type {AuthContextValue} from '../types';

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext debe usarse dentro de AuthProvider');
  return ctx;
}

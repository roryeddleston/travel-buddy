import { ReactNode } from 'react';
import { ThemeProvider } from './ThemeContext';
import { TripsProvider } from './TripsContext';
import { AuthProvider } from './AuthContext';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <TripsProvider>
        <AuthProvider>{children}</AuthProvider>
      </TripsProvider>
    </ThemeProvider>
  );
};
import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  mobileNumber: string;
  setMobileNumber: (num: string) => void;
  sentOtp: string;
  isAuthenticated: boolean;
  userProfile: { name?: string; phone?: string; email?: string } | null;
  sendOtp: (phone: string) => Promise<{ success: boolean; error?: string }>;
  verifyOtp: (code: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (name: string, phone: string, email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileNumber, setMobileNumber] = useState('98765 43210');
  const [sentOtp, setSentOtp] = useState('123456');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<{ name?: string; phone?: string; email?: string } | null>(null);

  const sendOtp = async (phone: string): Promise<{ success: boolean; error?: string }> => {
    const cleaned = phone.replace(/\s+/g, '');
    if (!cleaned) {
      return { success: false, error: 'Please enter your mobile number.' };
    }
    if (cleaned.length < 10) {
      return { success: false, error: 'Please enter a valid 10-digit mobile number.' };
    }
    setMobileNumber(phone);
    setSentOtp('123456'); // Standard mock OTP for test flow
    return { success: true };
  };

  const verifyOtp = async (code: string): Promise<{ success: boolean; error?: string }> => {
    if (code === '123456' || code.length === 6) {
      setIsAuthenticated(true);
      setUserProfile({ phone: mobileNumber, name: 'G-Vanta User' });
      return { success: true };
    }
    return { success: false, error: 'Invalid verification code. Try 123456.' };
  };

  const signUp = async (name: string, phone: string, email: string): Promise<{ success: boolean; error?: string }> => {
    if (!name.trim()) {
      return { success: false, error: 'Please enter your full name.' };
    }
    if (!phone.trim()) {
      return { success: false, error: 'Please enter your mobile number.' };
    }
    setMobileNumber(phone);
    setUserProfile({ name, phone, email });
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        mobileNumber,
        setMobileNumber,
        sentOtp,
        isAuthenticated,
        userProfile,
        sendOtp,
        verifyOtp,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

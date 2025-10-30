import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Deal data interface matching the form structure
export interface DealData {
  firstName: string;
  lastName: string;
  state: string;
  industry: string;
  naicsCode: string;
  timeInBusiness: string;
  fico: string;
  monthlyRevenue: string;
  monthlyExpenses: string;
  position: string;
  grossFundedAmount: string;
  term: string;
  paymentFrequency: string;
  advanceType: string;
  isoCommission: string;
  moic: string;
  factorRate: string;
}

// Default/empty deal data for new deals
export const defaultDealData: DealData = {
  firstName: '',
  lastName: '',
  state: '',
  industry: '',
  naicsCode: '',
  timeInBusiness: '',
  fico: '',
  monthlyRevenue: '',
  monthlyExpenses: '',
  position: '',
  grossFundedAmount: '',
  term: '',
  paymentFrequency: '',
  advanceType: '',
  isoCommission: '',
  moic: '',
  factorRate: ''
};

// Context interface
interface DealContextType {
  currentDeal: DealData;
  updateDeal: (updates: Partial<DealData>) => void;
  resetDeal: () => void;
  saveDraft: () => void;
  isDraft: boolean;
  dealName: string;
}

// Create the context
const DealContext = createContext<DealContextType | undefined>(undefined);

// Provider props
interface DealProviderProps {
  children: ReactNode;
}

// Provider component
export const DealProvider: React.FC<DealProviderProps> = ({ children }) => {
  const [currentDeal, setCurrentDeal] = useState<DealData>(defaultDealData);
  const [isDraft, setIsDraft] = useState(false);

  // Update deal data
  const updateDeal = useCallback((updates: Partial<DealData>) => {
    setCurrentDeal(prev => ({ ...prev, ...updates }));
    setIsDraft(true);
  }, []);

  // Reset to default/new deal
  const resetDeal = useCallback(() => {
    setCurrentDeal(defaultDealData);
    setIsDraft(false);
  }, []);

  // Save draft (in future, could persist to localStorage or backend)
  const saveDraft = useCallback(() => {
    // For now, just mark as saved
    setIsDraft(false);

    // In future: localStorage.setItem('dealDraft', JSON.stringify(currentDeal));

    // Return true to indicate successful save (for toast notification)
    return true;
  }, [currentDeal]);

  // Derive deal name from owner name or generate generic name
  const dealName = React.useMemo(() => {
    if (currentDeal.firstName && currentDeal.lastName) {
      return `${currentDeal.firstName} ${currentDeal.lastName}`;
    }
    if (currentDeal.firstName || currentDeal.lastName) {
      return currentDeal.firstName || currentDeal.lastName;
    }

    // Generate generic deal name: "Deal #472-10-27"
    const dealNumber = Math.floor(Math.random() * 900) + 100; // 100-999
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `Deal #${dealNumber}-${month}-${day}`;
  }, [currentDeal.firstName, currentDeal.lastName]);

  const contextValue: DealContextType = {
    currentDeal,
    updateDeal,
    resetDeal,
    saveDraft,
    isDraft,
    dealName
  };

  return (
    <DealContext.Provider value={contextValue}>
      {children}
    </DealContext.Provider>
  );
};

// Custom hook to use the deal context
export const useDeal = () => {
  const context = useContext(DealContext);
  if (context === undefined) {
    throw new Error('useDeal must be used within a DealProvider');
  }
  return context;
};
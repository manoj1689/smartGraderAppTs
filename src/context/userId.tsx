import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserIdContextType {
  selectedUserId: number;
  setSelectedUserId: React.Dispatch<React.SetStateAction<number>>;
}

const UserIdContext = createContext<UserIdContextType | undefined>(undefined);

export const UserIdProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedUserId, setSelectedUserId] = useState<number>(1); // Example default ID

  return (
    <UserIdContext.Provider value={{ selectedUserId, setSelectedUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};

export const useUserId = () => {
  const context = useContext(UserIdContext);
  if (context === undefined) {
    throw new Error('useUserId must be used within a UserIdProvider');
  }
  return context;
};


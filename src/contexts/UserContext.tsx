import React, { createContext, useContext } from 'react';
import { useGetMyUser } from '@/api/MyUserApi';
import { User } from '@/types'; 

interface UserContextType {
  currentUser: User | null;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  
  // Call your custom hook to get the currentUser 
     
  const { currentUser } = useGetMyUser(); 

  const contextValue: UserContextType = {
    currentUser: currentUser || null,
  };

  return (
    <UserContext.Provider value={ contextValue }>
      {children}
    </UserContext.Provider>
  );

};

export const useUser = (): UserContextType => {

  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;

};

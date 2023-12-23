// Importing libraries
import React, { ReactNode, createContext, useContext, useReducer } from 'react';

// Importing types
import { AuthContextType, User } from './type';

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setAuthenticated: () => {},
    user: null,
});

export default AuthContext;
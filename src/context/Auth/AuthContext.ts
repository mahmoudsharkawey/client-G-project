import { createContext, useContext } from "react";

interface AuthContextType {
  email: string | null;
  token: string | null;
  isAuthenticated: boolean;
  myOrders: any[];
  login: (email: string, token: string) => void;
  logout: () => void;
  getMyOrders:() => void;
}

export const AuthContext = createContext<AuthContextType>({
  email: null,
  token: null,
  myOrders: [],
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  getMyOrders: () => {},
});

export const useAuth = () => useContext(AuthContext);

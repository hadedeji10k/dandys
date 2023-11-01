import { dandysToken, dandysUser } from "@/utils/constant";
import { isFuture } from "date-fns";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGetCurrentUserQuery } from "./sellerApiCalls";
import { useAppDispatch } from "./hook";
import { saveUser } from "./slices/user";
import Loader from "@/component/Loader";

export interface IToken {
  value?: string | null;
  expires?: Date | string | null;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: any;
  token: IToken | null;
  login: (user: any, token: IToken) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isLoading: false,
  isAuthenticated: false,
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const location = useLocation();

  const [user, setUser] = useState(() => {
    const user = localStorage.getItem(dandysUser);
    return user ? JSON.parse(user) : null;
  });

  const [token, setToken] = useState(() => {
    const token = localStorage.getItem(dandysToken);
    return token ? JSON.parse(token) : null;
  });

  const [isLoading, setIsLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user === null || token === null) {
      setIsAuthenticated(false);
      setIsLoading(false);
    } else {
      const notExpired = isFuture(new Date(token.expires));
      if (notExpired) {
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        logout();
      }
    }
  }, [user, token, location.pathname]);

  const login = (user: any, token: IToken) => {
    window.localStorage.setItem(dandysToken, JSON.stringify(token));
    window.localStorage.setItem(dandysUser, JSON.stringify(user));
    setUser(user);
    setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    window.localStorage.removeItem(dandysToken);
    window.localStorage.removeItem(dandysUser);
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const value = {
    isLoading,
    isAuthenticated,
    user,
    token,
    login,
    logout,
  };

  return (
    <Loader spinning={isLoading}>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </Loader>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;

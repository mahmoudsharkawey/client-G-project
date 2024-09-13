import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "sonner";
import { BASE_URL } from "../../../constants";

const Email_KEY = "email";
const TOKEN_KEY = "token";


const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [email, setEmail] = useState<string | null>(
    localStorage.getItem(Email_KEY)
  );

  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY)
  );

  const [myOrders, setMyOrders] = useState<any[]>([]);

  const isAuthenticated = !!token;

  const login = (email: string, token: string) => {
    setEmail(email);
    setToken(token);
    localStorage.setItem(Email_KEY, email);
    localStorage.setItem(TOKEN_KEY, token);
  };

  const logout = () => {
    localStorage.removeItem(Email_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setEmail(null);
    setToken(null);
    toast.success("Logged out successfully");
  };

  const getMyOrders = async () => {
    const response = await fetch(`${BASE_URL}/user/my-orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) return;

    const data = await response.json();

    setMyOrders(data);
    console.log(data);
  };


  return (
    <AuthContext.Provider
      value={{
        email,
        token,
        myOrders,
        isAuthenticated,
        login,
        logout,
        getMyOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

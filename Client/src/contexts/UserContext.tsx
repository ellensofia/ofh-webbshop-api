import { createContext, useContext, useEffect, useState } from "react";

export interface User {
  username: string;
  email: string;
  password: string;
  _id: string;
  isAdmin: boolean;
}

interface Props {
  children: React.ReactNode;
}

interface UserContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>; // Update the return type to Promise<void>
  register: (email: string, username: string, password: string) => Promise<string>;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  login: () => {
    return new Promise((_, reject) => {
      reject(new Error("Login function not implemented"));
    });
  },
  logout: () => Promise.resolve(),
  register: async () => "",
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/checkUserInfo`);

      if (!response.ok) {
        throw new Error("Failed to fetch user information");
      }
      const userResponse = await response.json();
      setUser(userResponse);
    };
    fetchUser();
  }, []);

  const RegisterUser = async (email: string, username: string, password: string) => {
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      return errorMessage;
    }
    const user = await response.json();
    setUser(user);
    return "";
  };

  const LogInUser = async (email: string, password: string) => {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-type": "application/json" },
    });
 
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error);
    }
    
    const user = await response.json();
    setUser(user);
    return user;
  };

  const LogoutUser = async () => {
    const response = await fetch("/api/users/logout", {
      method: "POST",
    });

    if (response.ok) {
      setUser(null);
      console.log("utloggad");
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        register: RegisterUser,
        login: LogInUser,
        logout: LogoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

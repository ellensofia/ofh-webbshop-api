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
  login: (username: string, password: string) => Promise<User>;
  //   logout: () => Promise<void>; // Update the return type to Promise<void>
  register: (email: string, username: string, password: string) => Promise<string>;
  //   checkUsername: (username: string) => void;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  login: () => {
    return new Promise((_, reject) => {
      reject(new Error("Login function not implemented"));
    });
  },
  //   logout: () => Promise.resolve(),
  register: async () => "",
  //   checkUsername: () => {},
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

  //   const CheckUsername = async (username: string) => {
  //     try {
  //       const response = await fetch("/api/users/checkUsername", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ username }),
  //       });
  //       if (!response.ok) {
  //         throw new Error("Failed to check username");
  //       }
  //       const { isUsernameTaken } = await response.json();
  //       return isUsernameTaken;
  //     } catch (error: any) {
  //       throw new Error(error.message || "Failed to check username");
  //     }
  //   };

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
      throw new Error("Failed to log in user");
    }
    const user = await response.json();
    setUser(user);
    return user;
  };

  //   const LogoutUser = async () => {
  //     try {
  //       await sendLogoutRequest();
  //       setUser(null);
  //     } catch (error) {
  //       console.error("Failed to log out user:", error);
  //     }
  //   };

  // Ensure sendLogoutRequest returns a Promise as well
  //   const sendLogoutRequest = async () => {
  //     try {
  //       const response = await fetch("/api/users/logout", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to log out user");
  //       }
  //     } catch (error: any) {
  //       throw new Error(error.message || "Failed to log out user");
  //     }
  //   };

  return (
    <UserContext.Provider
      value={{
        user,
        register: RegisterUser,
        login: LogInUser,
        // logout: LogoutUser,
        // checkUsername: CheckUsername,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

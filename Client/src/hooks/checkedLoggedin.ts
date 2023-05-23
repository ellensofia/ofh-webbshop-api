import { useUserContext } from "../contexts/UserContext";

export function useCheckIsLoggedIn() {
  const { user } = useUserContext();

    if (user?.username) {
      return true;
    }
    return false;
  }
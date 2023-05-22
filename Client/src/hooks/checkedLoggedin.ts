export function checkIsLoggedIn() {
    if (localStorage.getItem("loggedInUsername")) {
      return true;
    }
    return false;
  }
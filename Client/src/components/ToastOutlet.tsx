import { Outlet } from "react-router-dom";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import Toast from "./Toast";

/**
 * Displays a toast message for the recently added item to the shopping cart
 * This component uses the useShoppingCart context for handling toast visibility and state.
 * Without this outlet the "go to bag"-button doesn't work.
 */
function ToastOutlet() {
  const { lastAddedItem, clearLastAddedItem } = useShoppingCart();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    clearLastAddedItem();
  };

  return (
    <>
      <Outlet />
      <Toast
        open={Boolean(lastAddedItem)}
        onClose={handleClose}
        lastAddedItem={lastAddedItem}
        clearLastAddedItem={clearLastAddedItem}
      />
    </>
  );
}

export default ToastOutlet;

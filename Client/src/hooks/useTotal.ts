import { CartItem } from "../../data";

/**
 * @param items
 * Calculates the total number of items and the total price for a given array
 * of cart items by iterating over the items using the reduce method.
 */
export function useTotal(items: CartItem[]) {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return { totalItems, totalPrice };
}

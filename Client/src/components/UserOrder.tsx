import { TableCell, TableRow } from "@mui/material";
import { Order } from "../contexts/OrderContext";

interface UserOrderProps {
  order: Order;
}

export function UserOrder({ order }: UserOrderProps) {
  return (
    <TableRow>
      <TableCell align="left" sx={{ fontSize: "1rem", cursor: 'pointer' }}>
        {order._id}
      </TableCell>
      <TableCell align="center">
        {order.createdAt}
      </TableCell>
      <TableCell align="center">
        {order.orderItems.length}
      </TableCell>
      <TableCell align="center">
        {order.price + " SEK"}
      </TableCell>
      <TableCell align="right">
        {order.isShipped ? (<span>Shipped &#10003;</span>):(<span>Pending shippment</span>)}
      </TableCell>
    </TableRow>
  );
}

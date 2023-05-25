import { TableCell, TableRow } from "@mui/material";
import { Order } from "../contexts/OrderContext";
import { useNavigate } from "react-router-dom";

interface UserOrderProps {
  order: Order;
}

export function UserOrder({ order }: UserOrderProps) {
    const navigate = useNavigate();
    
  return (
    <TableRow>
      <TableCell align="left" sx={{ fontSize: "1rem", cursor: 'pointer' }}>
        <span onClick={() => navigate(`/api/orders/${order._id}`)}>{order._id}</span>
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

import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Order } from "../contexts/OrderContext";

interface UserOrderProps {
  order: Order;
}

export function UserOrder({ order }: UserOrderProps) {
  const navigate = useNavigate();

  return (
    <>
      <TableRow
        sx={{
          display: "none",
          "@media (min-width: 721px)": {
            display: "table-row",
          },
        }}
      >
        <TableCell align="left" sx={{ fontSize: "1rem", cursor: "pointer" }}>
          <span onClick={() => navigate(`/orders/${order._id}`)}>{order._id}</span>
        </TableCell>
        <TableCell align="center">{order.createdAt.replace("T", " ").slice(0, order.createdAt.length - 2)}</TableCell>
        <TableCell align="center">{order.orderItems.length}</TableCell>
        <TableCell align="center">{order.price + " SEK"}</TableCell>
        <TableCell align="right">
          {order.isShipped ? <span>Shipped &#10003;</span> : <span>Pending shippment</span>}
        </TableCell>
      </TableRow>

      {/*-------------- SMALLER SCREENS --------------*/}
      <TableRow
        sx={{
          display: "none",
          "@media (max-width: 720px)": {
            display: "table-row",
          },
        }}
      >
        <TableCell
          sx={{ display: "flex", gap: "1rem", justifyContent: "space-between", cursor: "pointer" }}
          onClick={() => navigate(`/orders/${order._id}`)}
        >
          <Box component="div">
            <Box>
              <Typography variant="button">ID: </Typography>
              {order._id}
            </Box>
            <Box>
              <Typography variant="button">Reg: </Typography>
              {order.createdAt.replace("T", " ").slice(0, order.createdAt.length - 2)}
            </Box>
            <Box>
              <Typography variant="button">Price: </Typography>
              {order.price + " SEK"}
            </Box>
          </Box>
          <Box
            component="div"
            sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}
          >
            <Box>{order.isShipped ? <span>Shipped &#10003;</span> : <span>Pending shippment</span>}</Box>
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
}

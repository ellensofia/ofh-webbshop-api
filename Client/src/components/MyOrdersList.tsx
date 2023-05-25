import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Order } from "../contexts/OrderContext";
import { useUserContext } from "../contexts/UserContext";
import { UserOrder } from "./UserOrder";

export function MyOrdersList() {
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const { user } = useUserContext();

  const getUserOrders = async () => {
    const response = await fetch(`/api/orders/user/${user?._id}`);
    const data = await response.json();

    if (response.ok) {
      setMyOrders(data);
    }
  };

  useEffect(() => {
    getUserOrders();
  });

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "2rem",
          marginBottom: "1rem",
        }}
      >
        <h2>My orders</h2>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontSize: "1.5rem" }}>
                Order ID
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.5rem" }}>
                Date
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.5rem" }}>
                Products
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.5rem" }}>
                Price
              </TableCell>
              <TableCell align="right" sx={{ fontSize: "1.5rem" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myOrders.map((order) => (
              <UserOrder key={order._id} order={order} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

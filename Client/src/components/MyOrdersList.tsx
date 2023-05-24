import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState, useEffect } from "react";

export function MyOrdersList() {
  const [orders, setOrders] = useState([]);

  const getUserOrders = async () => {
    const response = await fetch(`/api/orders/user/:id`);
    const data = await response.json();

    if (response.ok) {
      setOrders(data);
      console.log(data);
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
              <TableCell />
              <TableCell align="left" sx={{ fontSize: "1.2rem" }}>
                Order ID
              </TableCell>
              <TableCell align="left" sx={{ fontSize: "1.2rem" }}>
                User
              </TableCell>
              <TableCell align="left" sx={{ fontSize: "1.2rem" }}>
                Date
              </TableCell>
              <TableCell align="right" sx={{ fontSize: "1.2rem" }}>
                Status
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <div>{order}</div>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

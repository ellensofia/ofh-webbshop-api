import {
  Box,
  Container,
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Order, useOrder } from "../../contexts/OrderContext";
import AdminOrderRow from "./AdminOrderRow";

function AdminOrderTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { getAllOrders, markShipped } = useOrder();

  useEffect(() => {
    const fetchOrders = async () => {
      return await getAllOrders().then((orders) => setOrders(orders));
    };
    fetchOrders();
  }, []);

  const handleMarkShipped = async (orderId: string) => {
    const updatedOrder = await markShipped(orderId);
    setOrders((prevOrders) => prevOrders.map((order) => (order._id === updatedOrder._id ? updatedOrder : order)));
  };

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
        <h2>Orders</h2>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{
              "@media (max-width: 720px)": {
                display: "none",
              },
            }}
          >
            <TableRow>
              <TableCell sx={styledTableCell}>Order Id</TableCell>
              <TableCell sx={styledTableCell}>Registered</TableCell>
              <TableCell sx={styledTableCell}>Order Shipped</TableCell>
              <TableCell sx={styledTableCell}>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <AdminOrderRow key={order._id} order={order} handleMarkShipped={handleMarkShipped} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

const styledTableCell: SxProps = {
  fontSize: "1.5rem",
};

export default AdminOrderTable;

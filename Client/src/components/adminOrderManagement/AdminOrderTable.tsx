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
import { Order } from "../../contexts/OrderContext";
import AdminOrderRow from "./AdminOrderRow";

interface Props {
  orders: Order[];
}

function AdminOrderTable({ orders }: Props) {
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
          <TableHead>
            <TableRow>
              <TableCell sx={styledTableCell}>Order Id</TableCell>
              <TableCell sx={styledTableCell}>Registered</TableCell>
              <TableCell sx={styledTableCell}>Order Shipped</TableCell>
              <TableCell sx={styledTableCell}>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <AdminOrderRow key={order._id} order={order} />
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

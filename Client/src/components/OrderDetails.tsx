import { RadioButtonUnchecked, TaskAlt } from "@mui/icons-material";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Order, useOrder } from "../contexts/OrderContext";

export function OrderDetails() {
  const [order, setOrder] = useState<Order>();
  const { getOneOrder } = useOrder();
  const { id } = useParams<{ id: string }>();

  console.log(order);

  useEffect(() => {
    async function getOrder() {
      if (!id) return;
      const gotOrder = await getOneOrder(id);
      setOrder(gotOrder);
    }
    getOrder();
  }, [id, getOneOrder]);

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
        <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
          <Typography variant="h6">{"Order id: "}</Typography>
          <Typography variant="body1">{order?._id}</Typography>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography variant="h6">{"Shipped:"}</Typography>
          <Typography>{order?.isShipped ? <TaskAlt /> : <RadioButtonUnchecked />}</Typography>
        </div>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left" sx={{ fontSize: "1.5rem" }}>
                Title
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.5rem" }}>
                Desc
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.5rem" }}>
                Quantity
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.5rem" }}>
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order?.orderItems.map((items) => (
              <TableRow key={items._id}>
                <TableCell align="left" sx={{ fontSize: "1rem" }}>
                  <img style={{ width: "10rem" }} src={`/api/images/${items.product.imageId}`} />
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "1rem" }}>
                  <div>{items.product.title}</div>
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "1rem" }}>
                  <div>{items.product.description}</div>
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "1rem" }}>
                  <div>{items.quantity}</div>
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "1rem" }}>
                  <div>{items.product.price} SEK</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          padding: "2rem 0 1rem",
        }}
      >
        <Typography variant="body1">{"User information:"}</Typography>
        <Typography variant="body2">{"Name: " + order?.address.firstName + " " + order?.address.lastName}</Typography>
        <Typography variant="body2">{"Email: " + order?.userId.email}</Typography>
        <Typography variant="body2">{"City: " + order?.address.city}</Typography>
        <Typography variant="body2">{"Post code: " + order?.address.postCode}</Typography>
        <Typography variant="body2">{"Street: " + order?.address.street}</Typography>
        <Typography variant="body2">{"Phone number: " + order?.address.phoneNumber}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Typography variant="subtitle1">Total: {order?.price} SEK</Typography>
      </Box>
    </Container>
  );
}

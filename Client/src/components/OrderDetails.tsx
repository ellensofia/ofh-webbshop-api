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
import { OrderProductRow } from "./OrderProductRow";

export function OrderDetails() {
  const [order, setOrder] = useState<Order>();
  const { getOneOrder } = useOrder();
  const { id } = useParams<{ id: string }>();

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
          "@media (max-width: 550px)": {
            display: "block",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            gap: "1rem",
            "@media (max-width: 550px)": {
              display: "block",
              marginBottom: "1rem",
            },
          }}
        >
          <Typography variant="h6">{"Order id: "}</Typography>
          <Typography variant="body1">{order?._id}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography variant="h6">{"Shipped:"}</Typography>
          <Typography>{order?.isShipped ? <TaskAlt /> : <RadioButtonUnchecked />}</Typography>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{
              "@media (max-width: 550px)": {
                display: "none",
              },
            }}
          >
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
            {order?.orderItems.map((item) => (
              <OrderProductRow key={item._id} item={item} />
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

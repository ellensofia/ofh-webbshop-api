import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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
       if (!id) return
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
        <h2>{"Order id: " + order?._id}</h2>
        <span>{order?.isShipped ? <h4>Status: Shipped</h4> : <h4>Status: Pending shippment</h4>}</span>
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
                  <img  style={{ width: '10rem'}} src={`/api/images/${items.product.imageId}`}/>
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "2rem",
          marginBottom: "1rem",
        }}
      >
        <h3>Total: {order?.price} SEK</h3>
      </Box>
    </Container>
  );
}

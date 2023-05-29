import { Box, Container, TableCell, TableRow } from "@mui/material";
import { OrderItem } from "../contexts/OrderContext";

interface OrderProductRowProps {
  item: OrderItem;
}

export function OrderProductRow({ item }: OrderProductRowProps) {
  return (
    <>
      <TableRow
        sx={{
          display: "none",
          "@media (min-width: 551px)": {
            display: "table-row",
          },
        }}
      >
        <TableCell align="left" sx={{ fontSize: "1rem" }}>
          <Box
            component="img"
            sx={{
              width: "10rem",
            }}
            src={`/api/images/${item.product.imageId}`}
          />
        </TableCell>
        <TableCell align="left" sx={{ fontSize: "1rem" }}>
          <Box>{item.product.title}</Box>
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "1rem" }}>
          <Box>{item.product.description}</Box>
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "1rem" }}>
          <Box>{item.quantity}</Box>
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "1rem" }}>
          <Box>{item.product.price} SEK</Box>
        </TableCell>
      </TableRow>

      {/*-------------- SMALLER SCREENS --------------*/}
      <TableRow
        sx={{
          display: "none",
          "@media (max-width: 550px)": {
            display: "table-row",
          },
        }}
      >
        <TableCell sx={{ display: "flex", gap: "1rem" }}>
          <Box
            component="img"
            sx={{
              width: "7rem",
            }}
            src={`/api/images/${item.product.imageId}`}
          />
          <Container
            sx={{ display: "flex", flexDirection: "column", alignItems: "end", justifyContent: "space-evenly" }}
          >
            <Box sx={{ fontSize: "1.5rem" }}>{item.product.title}</Box>
            <Box sx={{ fontSize: "1rem" }}>{item.product.description}</Box>
            <Box sx={{ fontSize: "1.2rem" }}> Quantity: {item.quantity}</Box>
            <Box sx={{ fontSize: "1.2rem" }}>{item.product.price} SEK</Box>
          </Container>
        </TableCell>
      </TableRow>
    </>
  );
}

import {
  Box,
  Container,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Order } from "../contexts/OrderContext";

interface Props {
  order: Order;
}

/**
 * Renders the total price and total amount of items in the order
 */
function OrderSummary({ order }: Props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth={isSmallScreen ? "sm" : "md"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0 1rem",
        }}
      >
        <Typography sx={{ marginBottom: "0.5rem" }}>Total items: </Typography>
        <Typography>{order.totalItems}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0 1rem",
        }}
      >
        <Typography>Total price: </Typography>
        <Typography data-cy="total-price">{order.totalPrice} SEK</Typography>
      </Box>
      <Divider
        sx={{
          backgroundColor: theme.palette.primary.main,
          marginBottom: "2rem",
          marginTop: "1rem",
        }}
      ></Divider>
    </Container>
  );
}

export default OrderSummary;

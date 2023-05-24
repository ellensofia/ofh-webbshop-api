import { Button, Typography, useMediaQuery } from "@mui/material";
import { Container, useTheme } from "@mui/system";
import { Link } from "react-router-dom";
import { Order } from "../contexts/OrderContext";

interface Props {
  order: Order;
}

/**
 * Renders the information that the user puts into the DeliveryForm
 */
function UserInfoOrder({ order }: Props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      maxWidth={isSmallScreen ? "sm" : "md"}
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant={isSmallScreen ? "h6" : "h5"}>Thank you for your order!</Typography>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <Typography textAlign={"center"}>An order confirmation has been sent to:</Typography>
        <Typography>{order?.address.email}</Typography>
      </Container>
      <Typography variant={isSmallScreen ? "h6" : "h5"} marginTop={"2rem"}>
        Your order details:
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: isSmallScreen ? "0.2rem" : "1rem",
          marginBottom: isSmallScreen ? "1rem" : "3rem",
        }}
      >
        <Typography>{`${order?.address.firstName} ${order?.address.lastName}`}</Typography>
        <Typography>{order?.address.email}</Typography>
        <Typography>
          {order?.address.postCode} {order?.address.city}
        </Typography>
        <Typography>{order?.address.phoneNumber}</Typography>
      </Container>
      <Button component={Link} to={"/"} variant="contained">
        Continue to shop
      </Button>
    </Container>
  );
}

export default UserInfoOrder;

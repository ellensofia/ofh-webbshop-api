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
      <Typography variant={isSmallScreen ? "h6" : "h5"}>
        Thank you for your order!
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <Typography textAlign={"center"}>
          An order confirmation has been sent to:
        </Typography>
        <Typography>{order?.email}</Typography>
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
        <Typography>{order?.name}</Typography>
        <Typography>{order?.address}</Typography>
        <Typography>
          {order?.postalcode} {order?.city}
        </Typography>
        <Typography>{order?.phonenumber}</Typography>
      </Container>
      <Button component={Link} to={"/"} variant="contained">
        Continue to shop
      </Button>
    </Container>
  );
}

export default UserInfoOrder;

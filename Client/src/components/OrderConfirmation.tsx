import {
  Box,
  Card,
  CardContent,
  CardMedia,
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
 * Renders the cards for the products in the order
 */
function OrderConfirmation({ order }: Props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth={isSmallScreen ? "sm" : "md"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: isSmallScreen ? "center" : "space-between",
          alignItems: "center",
          flexDirection: isSmallScreen ? "column" : "row",
          margin: "1rem",
        }}
      >
        <Typography sx={{ fontSize: isSmallScreen ? "1.2rem" : "1.3rem" }}>Your order</Typography>
        <Typography sx={{ fontSize: isSmallScreen ? "1.1rem" : "1.2rem" }}>{order?._id}</Typography>
      </Box>
      <Divider
        sx={{
          backgroundColor: theme.palette.primary.main,
          marginBottom: "1rem",
        }}
      ></Divider>
      {order.orderItems.map((orderItem) => (
        <Card
          key={orderItem._id}
          sx={{
            display: "flex",
            margin: "1rem",
            boxShadow: "none",
            position: "relative",
          }}
        >
          <CardMedia
            component="img"
            image={`/api/images/${orderItem.product.imageId}`}
            sx={{
              width: isSmallScreen ? "6rem" : "10rem",
            }}
          />
          <Container
            sx={{
              padding: "0px !important",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Container
              sx={{
                padding: "0px !important",
                marginTop: isSmallScreen ? "0.8rem" : "1rem",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0px !important",
                  marginLeft: "1rem",
                  marginTop: isSmallScreen ? "0.2rem" : "2rem",
                }}
              >
                <Typography variant={isSmallScreen ? "body1" : "h6"}>{orderItem.product.title}</Typography>
                <Typography variant={isSmallScreen ? "body2" : "body1"}>
                  {orderItem.product.price * orderItem.quantity} SEK
                </Typography>
              </CardContent>
            </Container>
            <CardContent
              sx={{
                padding: "0px !important",
                marginLeft: "1rem",
              }}
            >
              <Typography fontSize={"0.8rem"}>Quantity: {orderItem.quantity}</Typography>
            </CardContent>
          </Container>
        </Card>
      ))}
      <Divider
        sx={{
          backgroundColor: theme.palette.primary.main,
          marginBottom: "1rem",
        }}
      ></Divider>
    </Container>
  );
}

export default OrderConfirmation;

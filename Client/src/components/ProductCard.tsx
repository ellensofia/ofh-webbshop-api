import { Box, Button, CardContent, CardMedia, Container, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { SxProps, Theme, styled } from "@mui/material/styles";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../contexts/AdminProductContext";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import PageNotFound from "./PageNotFound";

/**
 * Returns a product card with image, brand, title, price, description and add to bag button
 */
function ProductCard() {
  const { id } = useParams<{ id: string }>();
  const { products } = useProduct();
  const product = products.find((p) => p._id === id);
  const { addItem } = useShoppingCart();
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const handleIncreaseQuantity = () => {
    const stock = product?.inStockAmount;
    if (stock !== undefined) {
      if (quantity < stock) {
        setQuantity(quantity + 1);
      } else {
        setErrorMessage(`Sorry we only have ${stock} items in stock`);
      }
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setErrorMessage("");
    }
  };

  if (!product) {
    return (
      <div>
        <PageNotFound />
      </div>
    );
  }

  return (
    <Container maxWidth="lg" sx={rootStyle}>
      <Box>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid key={product._id} xs={12} sm={12} md={12} data-cy="product">
            <Item
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <CardMedia>
                <img src={`/api/images/${product.imageId}`} alt={product.title} />
              </CardMedia>
              <CardContent sx={cardContentStyle}>
                <Typography variant="overline" sx={{ marginBottom: "1rem" }}>
                  {product.brand}
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: "1rem" }} data-cy="product-title">
                  {product.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ marginBottom: "2rem" }} data-cy="product-price">
                  {product.price} SEK
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    marginBottom: "2rem",
                  }}
                  data-cy="product-description"
                >
                  {product.description}
                </Typography>
                {product.inStockAmount > 0 && (
                  <>
                    <Typography variant="subtitle1">Quantity</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      <Button
                        variant="text"
                        onClick={handleDecreaseQuantity}
                        sx={{
                          fontSize: "1.3rem",
                          color: (theme) => theme.palette.text.primary,
                        }}
                      >
                        -
                      </Button>
                      <Typography data-cy="product-quantity">{quantity}</Typography>
                      <Button
                        variant="text"
                        onClick={handleIncreaseQuantity}
                        sx={{
                          fontSize: "1.3rem",
                          color: (theme) => theme.palette.text.primary,
                        }}
                      >
                        +
                      </Button>
                    </Box>
                    {errorMessage && (
                      <Typography variant="subtitle2" sx={{ color: "red", marginBottom: "1rem" }}>
                        {errorMessage}
                      </Typography>
                    )}
                  </>
                )}
                {product.inStockAmount > 0 ? (
                  <Button
                    onClick={() => addItem({ ...product, quantity })}
                    variant="contained"
                    data-cy="product-buy-button"
                  >
                    ADD TO BAG
                  </Button>
                ) : (
                  <Typography variant="body2" sx={{ color: "red" }}>
                    OUT OF STOCK
                  </Typography>
                )}
              </CardContent>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

/*  Styling */

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.subtitle2,
  textAlign: "left",
  color: theme.palette.text.primary,
  boxShadow: "none",
  "& img": {
    width: "100%",
    height: "auto",
    objectFit: "cover", // Ensures that the image fills the available space while preserving its aspect ratio
  },
}));

const rootStyle: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  marginTop: "1.5rem",
};

const cardContentStyle: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  textAlign: "left",
  "@media (min-width: 960px)": {
    // Media query for desktop view
    width: "100%",
    height: "auto",
    paddingLeft: "2rem",
  },
};

// const inputQuantityTextfieldStyle: SxProps<Theme> = {
//   width: "2rem",
//   "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
//     WebkitAppearance: "none",
//     margin: 0,
//   },
//   '& input[type="number"]': {
//     MozAppearance: "textfield",
//   },

//   "& .MuiInput-underline:before, & .MuiInput-underline:after": {
//     display: "none",
//   },
// };

export default ProductCard;

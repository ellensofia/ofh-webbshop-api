import { Badge, Box, IconButton, SxProps, Theme } from "@mui/material";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import { theme } from "../theme/theme";

/**
 * Renders icons to the right, inside the HeaderMain component
 */
function HeaderIcons() {
  const { items } = useShoppingCart();

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <IconButton
        className="material-symbols-outlined"
        sx={iconStyle}
        component={Link}
        to="/admin"
        data-cy="admin-link"
      >
        admin_panel_settings
      </IconButton>
      <IconButton
        className="material-symbols-outlined"
        sx={iconStyle}
        component={Link}
        to="/underconstruction"
      >
        favorite
      </IconButton>
      <Badge
        data-cy="cart-items-count-badge"
        badgeContent={totalQuantity}
        color="primary"
        sx={{
          "& .MuiBadge-badge": {
            fontFamily: theme.typography.subtitle2.fontFamily,
            textAlign: "center",
          },
        }}
      >
        <IconButton
          component={Link}
          to="/checkout"
          data-cy="cart-link"
          className="material-symbols-outlined"
          onClick={() => {
            window.scroll(0, 0);
          }}
          sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", cursor: "pointer" },
            color: (theme) => theme.palette.text.primary,
            padding: 0,
          }}
        >
          shopping_bag
        </IconButton>
      </Badge>
    </Box>
  );
}

/* Styling */

const iconStyle: SxProps<Theme> = {
  fontSize: { xs: "2rem", sm: "2.5rem" },
  cursor: "pointer",
  padding: { xs: "0rem", md: "0.3rem" },
  color: "black",
};

export default HeaderIcons;

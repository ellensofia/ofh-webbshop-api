import {
  AppBar,
  Container,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const StyledLink = (props: any) => (
  <Link component={RouterLink} underline="none" color="inherit" {...props} />
);

/**
 * Renders a header for when the user is in the shopping bag and on the checkout page
 */
function HeaderContinueShopping() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar elevation={0} position="static">
      <Container
        maxWidth="xl"
        sx={{
          padding: "0px !important",
          background: (theme) => theme.palette.primary.main,
        }}
      >
        <StyledLink to={`/`}>
          <Typography
            sx={{
              "&:hover": {
                textDecoration: "underline",
                textDecorationThickness: "0.01rem",
                textUnderlineOffset: "0.5rem",
              },
            }}
            variant={isSmallScreen ? "body1" : "h6"}
            margin={"1rem 2rem"}
          >
            Continue shopping
          </Typography>
        </StyledLink>
      </Container>
    </AppBar>
  );
}

export default HeaderContinueShopping;

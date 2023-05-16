import {
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

/**
 * Renders the UI for when the page is not found
 */
function PageNotFound() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "4rem",
      }}
    >
      <img src="/pagenotfound.svg" alt="page not found" width={"50%"} />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant={isSmallScreen ? "h6" : "h5"}
          sx={{ marginBottom: ".6rem" }}
        >
          OOPS...
        </Typography>
        <Typography>The page your looking for doesn't exist</Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ boxShadow: "none", marginTop: "1rem" }}
        >
          GO BACK
        </Button>
      </Container>
    </Container>
  );
}

export default PageNotFound;

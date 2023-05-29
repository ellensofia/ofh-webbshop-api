import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { theme } from "../theme/theme";

export function LoginRequet() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container maxWidth={isSmallScreen ? "sm" : "md"}>
      <Container
        sx={{
          display: "flex",
          margin: "1rem",
          padding: "0px !important",
        }}
      >
        <Box
          sx={{
            height: "2rem",
            width: "2rem",
            borderRadius: "5rem",
            display: "flex",
            background: theme.palette.primary.main,
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">2</Typography>
        </Box>
      </Container>
      <Container
        sx={{
          width: isSmallScreen ? "sm" : "md",
          marginTop: "1rem",
          display: "flex",
          alignItems: 'center',
          gap: '1rem',
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" marginLeft={"0.5rem"}>
          Please{" "}
          <Link to={"/login"} style={{ color: "black" }}>
            login
          </Link>{" "}
          to continue.
        </Typography>
        <Typography variant="h6" marginLeft={"0.5rem"}>
          Don't have an account?{" "}
          <Link to={"/register"} style={{ color: "black" }}>
            Register here!
          </Link>
        </Typography>
      </Container>
    </Container>
  );
}

import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { theme } from "../theme/theme";

export function LoginRequet() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container maxWidth={isSmallScreen ? "sm" : "md"}>
      <Container
        sx={{
          width: isSmallScreen ? "sm" : "md",
          marginTop: "5rem",
          display: "flex",
          alignItems: 'center',
          gap: '1rem',
          flexDirection: "column",

        }}
      >
        <Typography marginLeft={"0.5rem"} sx={{ fontSize: "1.1rem" }}>
          You have to {" "}
          <Link to={"/login"} style={{ color: "black" }}>
            login
          </Link>{" "}
          to make a purchase
        </Typography>
        <Typography marginLeft={"0.5rem"} sx={{ fontSize: "1rem" }}>
          Don't have an account?{" "}
          <Link to={"/register"} style={{ color: "black" }}>
            Sign up
          </Link>
        </Typography>
      </Container>
    </Container>
  );
}

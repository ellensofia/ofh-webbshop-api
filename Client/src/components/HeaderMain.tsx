import { Theme } from "@emotion/react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  styled,
  SxProps,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";
import { Link, LinkProps } from "react-router-dom";
import HeaderIcons from "./HeaderIcons";

const pages = [
  {
    name: "Products",
    link: "/",
  },
  { name: "Brands", link: "/underconstruction" },
  {
    name: "Campaigns",
    link: "/underconstruction",
  },
];

/**
 * Renders the main header.
 * On tablet the links to the left becomes a hamburger menu
 */
function HeaderMain() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      elevation={0}
      position="static"
      sx={{
        background: (theme) => theme.palette.background.default,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          borderBottom: "0.01rem solid black",
        }}
      >
        <Toolbar
          disableGutters
          sx={{ display: "grid", gridTemplateColumns: "1fr auto 1fr" }}
        >
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              aria-label="show"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "black" }}
            >
              <Box
                sx={{ fontSize: { xs: "2.1rem", sm: "2.5rem" } }}
                className="material-symbols-outlined"
              >
                menu
              </Box>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <StyledLink to={page.link}>
                    <Typography padding="0.5rem">{page.name}</Typography>
                  </StyledLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.link}
                onClick={handleCloseNavMenu}
                sx={headerButtonsStyling}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              flexGrow: { xs: 0, md: 1 },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <StyledLink to="/">
              <Box
                component="img"
                src="/logohome.png"
                alt="logga"
                sx={{
                  height: { xs: "6rem", sm: "7rem" },
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              />
            </StyledLink>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <HeaderIcons />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

/* Styling */

const headerButtonsStyling: SxProps<Theme> = {
  color: "black",
  display: "block",
  fontSize: "1.1rem",
  textTransform: "none",
  marginRight: "1.5rem",
  "&:hover": {
    textDecoration: "underline",
    textDecorationThickness: "0.01rem",
    textUnderlineOffset: "0.5rem",
  },
};

const StyledLink = styled(Link)<LinkProps>(() => ({
  textDecoration: "none",
  color: "inherit",
}));

export default HeaderMain;

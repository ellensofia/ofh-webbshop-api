import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useCheckIsLoggedIn } from "../hooks/checkedLoggedin";
import { iconStyle } from "./HeaderIcons";
import { useUserContext } from "../contexts/UserContext";

export default function UserButton() {
  const navigate = useNavigate();
  const isLoggedIn = useCheckIsLoggedIn();
  const { user } = useUserContext();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async (e: any) => {
    e.preventDefault();

    const response = await fetch("/api/users/logout", {
      method: "POST",
    });

    if (response.ok) {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <div>
      <IconButton
        className="material-symbols-outlined"
        sx={iconStyle}
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        person
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {isLoggedIn ? (
          <div>
            {user?.isAdmin === true && (
              <div>
                <MenuItem onClick={() => navigate("/orders")}>Orders</MenuItem>
                <MenuItem onClick={() => navigate("/products")}>Products</MenuItem>
              </div>
            )}
            <MenuItem onClick={() => navigate("/myOrders")}>My orders</MenuItem>
            <MenuItem onClick={handleLogout}>Log out</MenuItem>{" "}
          </div>
        ) : (
          <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
        )}
      </Menu>
    </div>
  );
}

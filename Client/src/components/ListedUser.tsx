import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import { theme } from "../theme/theme";

interface ListedUserProps {
  user: {
    _id: string;
    username: string;
    email: string;
    isAdmin: boolean;
  };
}

export function ListedUser({ user }: ListedUserProps) {
  return (
    <TableRow>
      <TableCell align="left" sx={{ fontSize: '1rem'}}>
        <span>{user.username}</span>
      </TableCell>
      <TableCell align="right">
      <IconButton
            className="material-symbols-outlined"
            data-cy="admin-edit-product"
            sx={{
              bgcolor: theme.palette.primary.main,
              color: "black",
              fontSize: "1.5rem",
              margin: "0.5rem",
            }}
          >
            shield
          </IconButton>
      </TableCell>
    </TableRow>
  );
}

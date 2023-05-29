import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import { theme } from "../theme/theme";
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';

interface ListedUserProps {
  user: {
    _id: string;
    username: string;
    email: string;
    isAdmin: boolean;
  };
  getAllUsers: () => Promise<void>;
}

export function ListedUser({ user, getAllUsers }: ListedUserProps) {
  const changeUserRole = async () => {
    const updatedUser = { ...user, isAdmin: !user?.isAdmin };

    const response = await fetch(`/api/users/${user?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    if (response.ok) {
      getAllUsers();
    }
  };
  return (
    <TableRow>
      <TableCell align="left" sx={{ fontSize: "1rem" }}>
        <span>{user.username}</span>
      </TableCell>
      <TableCell align="right">
        {!user.isAdmin ? (
          <IconButton
            className="material-symbols-outlined"
            data-cy="admin-edit-product"
            sx={{
              bgcolor: theme.palette.primary.main,
              color: "black",
              fontSize: "1.5rem",
              margin: "0.5rem",
            }}
            onClick={changeUserRole}
          >
            shield
          </IconButton>
        ) : (
          <IconButton
            className="material-symbols-outlined"
            data-cy="admin-edit-product"
            sx={{
              bgcolor: theme.palette.primary.main,
              color: "black",
              fontSize: "1.5rem",
              margin: "0.5rem",
            }}
            onClick={changeUserRole}
          >
            <GppGoodOutlinedIcon color="secondary"/>
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
}

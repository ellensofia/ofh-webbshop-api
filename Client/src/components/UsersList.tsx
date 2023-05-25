import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import { User } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import { ListedUser } from "./ListedUser";

export function UsersList() {
  const [listOfUsers, setListOfUsers] = useState<User[]>([]);

  const getAllUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();

    if (response.ok) {
      setListOfUsers(data);
    }
  };

  useEffect(() => {
    getAllUsers();
  });

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "2rem",
          marginBottom: "1rem",
        }}
      >
        <h2>Users</h2>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontSize: "1.5rem" }}>
                Username
              </TableCell>
              <TableCell align="right" sx={{ fontSize: "1.5rem" }}>
                Admin status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listOfUsers.map((user) => (
              <ListedUser
                key={user._id}
                user={{
                  _id: user._id,
                  username: user.username,
                  email: user.email,
                  isAdmin: user.isAdmin,
                }}
                getAllUsers={getAllUsers}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

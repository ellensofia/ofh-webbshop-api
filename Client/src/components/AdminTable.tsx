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
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../contexts/AdminProductContext";
import AdminProductRows from "./AdminProductRows";

/**
 * The AdminTable where all the AdminProductRows are
 */
function AdminTable() {
  const { products, getAllProducts } = useProduct();

  const displayAllProducts = useCallback(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    displayAllProducts();
  }, [displayAllProducts]);

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "2rem",
          marginBottom: "1rem",
          "@media (max-width: 720px)": {
            display: "block",
          },
        }}
      >
        <h2>Admin</h2>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            "@media (max-width: 720px)": {
              justifyContent: "revert",
            },
          }}
        >
          <Button
            variant="contained"
            sx={{
              height: "10%",
              "@media (max-width: 720px)": {
                fontSize: "10px",
              },
            }}
            component={Link}
            data-cy="admin-add-product"
            to="/admin/product/"
          >
            + Add product
          </Button>
          <Button
            variant="contained"
            sx={{
              height: "10%",
              "@media (max-width: 720px)": {
                fontSize: "10px",
              },
            }}
            component={Link}
            to="/admin/category/new/"
          >
            + Add category
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{
              "@media (max-width: 720px)": {
                display: "none",
              },
            }}
          >
            <TableRow>
              <TableCell align="center" sx={{ fontSize: "1.2rem" }}>
                Image
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.2rem" }}>
                Id
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.2rem" }}>
                Title
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.2rem" }}>
                Price
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.2rem" }}>
                In stock
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <AdminProductRows data-cy="product" key={product._id} product={product} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AdminTable;

import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import * as React from "react";
import { Link } from "react-router-dom";
import { Product, useProduct } from "../contexts/AdminProductContext";
import { theme } from "../theme/theme";
import DeleteProductDialog from "./DeleteProductDialog";

type Props = {
  product: Product;
};

/**
 * All the rows inside AdminTable
 */
function AdminProductRows(props: Props) {
  const { removeProduct } = useProduct();
  const [deleteProductDialogOpen, setDeleteProductDialogOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          display: "none",
          "@media (min-width: 721px)": {
            display: "table-row",
          },
        }}
        data-cy="product"
      >
        <TableCell component="th" scope="row" align="center" sx={{ width: { padding: "1rem 0.5rem" } }}>
          <Box
            component="img"
            src={`/api/images/${props.product.imageId}`}
            alt={props.product.title}
            sx={{ width: { xs: "4rem", sm: "10rem" } }}
          ></Box>
        </TableCell>
        <TableCell align="center" data-cy="product-id" sx={{ width: { padding: "1rem 0.5rem" } }}>
          {props.product._id}
        </TableCell>

        <TableCell align="center" data-cy="product-title" sx={{ width: { padding: "1rem 0.5rem" } }}>
          {props.product.title}
        </TableCell>
        <TableCell align="center" data-cy="product-price" sx={{ width: { padding: "1rem 0.5rem" } }}>
          {props.product.price} SEK
        </TableCell>
        <TableCell align="center" sx={{ width: { padding: "1rem 0.5rem" } }}>
          {props.product.inStockAmount}
        </TableCell>
        <TableCell align="center" sx={{ width: { padding: "1rem 0.5rem" } }}>
          <IconButton
            className="material-symbols-outlined"
            data-cy="admin-edit-product"
            sx={{
              bgcolor: theme.palette.primary.main,
              color: "black",
              fontSize: "1.8rem",
              margin: "1rem 0.5rem",
            }}
            component={Link}
            to={`/admin/product/${props.product._id}`}
          >
            edit
          </IconButton>
          <IconButton
            className="material-symbols-outlined"
            sx={{
              bgcolor: theme.palette.primary.main,
              color: "black",
              fontSize: "1.8rem",
            }}
            data-cy="admin-remove-product"
            onClick={() => setDeleteProductDialogOpen(true)}
          >
            delete
          </IconButton>
        </TableCell>
      </TableRow>

      {/*-------------- SMALLER SCREENS --------------*/}
      <TableRow
        sx={{
          display: "none",
          "@media (max-width: 720px)": {
            display: "table-row",
          },
        }}
      >
        <TableCell sx={{ display: "flex", justifyContent: "left" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Box
              component="img"
              src={`/api/images/${props.product.imageId}`}
              alt={props.product.title}
              sx={{
                width: { xs: "4rem", sm: "7rem" },
                height: { xs: "4rem", sm: "7rem" },
              }}
            ></Box>
            <Box component="div" sx={{ paddingLeft: "0.5rem" }}>
              <Box>
                <Typography variant="body2">ID: </Typography>
                {props.product._id}
              </Box>
              <Box>
                <Typography variant="body2">Title: </Typography>
                {props.product.title}
              </Box>
              <Box>
                <Box>
                  <Typography variant="body2">Price: </Typography>
                  {props.product.price} SEK
                </Box>
                <Box>
                  <Typography variant="body2">In stock: </Typography>
                  {props.product.inStockAmount}
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                flexDirection: "column",
                paddingLeft: "0.5rem",
              }}
            >
              <IconButton
                className="material-symbols-outlined"
                data-cy="admin-edit-product"
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: "black",
                  fontSize: { xs: "1.2rem", sm: "1.8rem" },
                }}
                component={Link}
                to={`/admin/product/${props.product._id}`}
              >
                edit
              </IconButton>
              <IconButton
                className="material-symbols-outlined"
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: "black",
                  fontSize: { xs: "1.2rem", sm: "1.8rem" },
                }}
                data-cy="admin-remove-product"
                onClick={() => setDeleteProductDialogOpen(true)}
              >
                delete
              </IconButton>
            </Box>
          </Box>
        </TableCell>
      </TableRow>
      <DeleteProductDialog
        open={deleteProductDialogOpen}
        handleClose={() => setDeleteProductDialogOpen(false)}
        removeProduct={() => removeProduct(props.product)}
      />
    </React.Fragment>
  );
}

export default AdminProductRows;

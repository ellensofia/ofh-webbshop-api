import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type Props = {
  open: boolean;
  handleClose: () => void;
  removeProduct: () => void;
};
/**
 * Renders a confirmation dialog to delete a product.
 * Closes the dialog when the user has chosen and clicked on an answer - 'Yes' or 'No'.
 * 'Yes' confirms the deletion of the product.
 */
function DeleteProductDialog({ open, handleClose, removeProduct }: Props) {
  const handleDeleteProduct = () => {
    removeProduct();
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete product"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this product?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          No
        </Button>
        <Button
          variant="contained"
          data-cy="confirm-delete-button"
          onClick={handleDeleteProduct}
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteProductDialog;

import { Check, RadioButtonUnchecked } from "@mui/icons-material";
import { IconButton, TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Order } from "../../contexts/OrderContext";
import { theme } from "../../theme/theme";

interface Props {
  order: Order;
}

function AdminOrderRow({ order }: Props) {
  const [isShipped, setIsShipped] = useState<boolean>(order.isShipped);

  const handleMarkShipped = async () => {
    setIsShipped(!isShipped);
  };

  return (
    <TableRow>
      <TableCell>
        <Typography variant="body2">{order._id}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{order.createdAt}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">
          <IconButton
            sx={{
              bgcolor: theme.palette.primary.main,
              color: "black",
              fontSize: "1.8rem",
              "&.Mui-disabled": {
                color: "black",
              },
            }}
            onClick={handleMarkShipped}
            disabled={isShipped}
          >
            {isShipped ? <Check /> : <RadioButtonUnchecked />}
          </IconButton>
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">
          <Link to={`/order/:${order._id}`}>Details</Link>
        </Typography>
      </TableCell>
    </TableRow>
  );
}

export default AdminOrderRow;

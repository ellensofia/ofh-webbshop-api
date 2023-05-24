import { RadioButtonUnchecked, TaskAlt } from "@mui/icons-material";
import { IconButton, Link, SxProps, TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Order } from "../../contexts/OrderContext";
import { theme } from "../../theme/theme";

interface Props {
  order: Order;
}

function AdminOrderRow({ order }: Props) {
  const [isShipped, setIsShipped] = useState<boolean>(order.isShipped);
  const navigate = useNavigate();

  const handleMarkShipped = async () => {
    setIsShipped(!isShipped);
  };

  return (
    <TableRow>
      <TableCell>
        <Typography variant="body2">{order._id}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">
          {order.createdAt.replace("T", " ").slice(0, order.createdAt.length - 2)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">
          <IconButton sx={styledIconButton} onClick={handleMarkShipped} disabled={isShipped}>
            {isShipped ? <TaskAlt /> : <RadioButtonUnchecked />}
          </IconButton>
        </Typography>
      </TableCell>
      <TableCell>
        <Link
          component={"button"}
          color={"secondary"}
          underline="hover"
          onClick={() => navigate(`/order/${order._id}`)}
        >
          See details
        </Link>
      </TableCell>
    </TableRow>
  );
}

const styledIconButton: SxProps = {
  bgcolor: theme.palette.primary.main,
  color: "black",
  fontSize: "1.8rem",
  "&.Mui-disabled": {
    color: "black",
  },
};

export default AdminOrderRow;

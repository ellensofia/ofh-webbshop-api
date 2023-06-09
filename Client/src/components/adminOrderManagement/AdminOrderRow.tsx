import { RadioButtonUnchecked, TaskAlt } from "@mui/icons-material";
import { Box, IconButton, Link, SxProps, TableCell, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Order } from "../../contexts/OrderContext";
import { theme } from "../../theme/theme";

interface Props {
  order: Order;
  handleMarkShipped: (orderId: string) => void;
}

function AdminOrderRow({ order, handleMarkShipped }: Props) {
  const navigate = useNavigate();

  return (
    <>
      <TableRow
        sx={{
          display: "none",
          "@media (min-width: 721px)": {
            display: "table-row",
          },
        }}
      >
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
            <IconButton
              sx={styledIconButton}
              onClick={() => {
                handleMarkShipped(order._id);
              }}
              disabled={order.isShipped}
            >
              {order.isShipped ? <TaskAlt /> : <RadioButtonUnchecked />}
            </IconButton>
          </Typography>
        </TableCell>
        <TableCell>
          <Link
            component={"button"}
            color={"secondary"}
            underline="hover"
            onClick={() => navigate(`/orders/${order._id}`)}
          >
            See details
          </Link>
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
        <TableCell sx={{ display: "flex", gap: "1rem", justifyContent: "space-between" }}>
          <Box component="div">
            <Box><Typography variant="button">ID: </Typography>{order._id}</Box>
            <Box><Typography variant="button">Reg: </Typography>{order.createdAt.replace("T", " ").slice(0, order.createdAt.length - 2)}</Box>
            <Link
              component={"button"}
              color={"secondary"}
              underline="always"
              fontSize={'18px'}
              onClick={() => navigate(`/orders/${order._id}`)}
            >
              See details
            </Link>
          </Box>
          <Box component="div" sx={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
            <Box>Shipped:</Box>
            <IconButton
              sx={styledIconButton}
              onClick={() => {
                handleMarkShipped(order._id);
              }}
              disabled={order.isShipped}
            >
              {order.isShipped ? <TaskAlt /> : <RadioButtonUnchecked />}
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
    </>
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

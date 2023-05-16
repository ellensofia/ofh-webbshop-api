import {
  Box,
  Container,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { CSSProperties } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useOrder } from "../contexts/OrderContext";
import PurchaseConfirmation from "./PurchaseConfirmation";

const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const DeliverySchema = Yup.object({
  email: Yup.string()
    .email("Please enter an valid email address")
    .required("Please enter an email address"),
  name: Yup.string().required("Please enter a name"),
  address: Yup.string().required("Please enter your address"),
  postalcode: Yup.string()
    .min(5, "The postal code should be 5 numbers")
    .max(5, "The postal code should be only 5 numbers")
    .required("Please enter the postal code"),
  city: Yup.string().required("Please enter your city"),
  phonenumber: Yup.string()
    .required()
    .matches(phoneRegExp, "Invalid phone number"),
});

export type DeliveryValues = Yup.InferType<typeof DeliverySchema>;

function DeliveryForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { createOrder } = useOrder();

  const formik = useFormik<DeliveryValues>({
    initialValues: {
      email: "",
      name: "",
      address: "",
      postalcode: "",
      city: "",
      phonenumber: "",
    },
    validationSchema: DeliverySchema,
    onSubmit: (deliveryValues) => {
      createOrder(deliveryValues);
      navigate("/confirmation");
    },
  });

  return (
    <Container maxWidth={isSmallScreen ? "sm" : "md"}>
      <Container
        sx={{
          display: "flex",
          margin: "1rem",
          padding: "0px !important",
        }}>
        <Box
          sx={{
            height: "2rem",
            width: "2rem",
            borderRadius: "5rem",
            display: "flex",
            background: theme.palette.primary.main,
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Typography variant="h6">2</Typography>
        </Box>
        <Typography variant="h6" marginLeft={"0.5rem"}>
          Delivery details
        </Typography>
      </Container>
      <Container
        sx={{
          width: isSmallScreen ? "sm" : "md",
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
        }}>
        <form
          onSubmit={formik.handleSubmit}
          style={rootStyle}
          data-cy="customer-form">
          <TextField
            id="email"
            type="email"
            name="email"
            label="Email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            inputProps={{ "data-cy": "customer-email" }}
            FormHelperTextProps={{ "data-cy": "customer-email-error" } as any}
          />
          <TextField
            id="name"
            type="name"
            name="name"
            label="Name"
            autoComplete="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            inputProps={{ "data-cy": "customer-name" }}
            FormHelperTextProps={{ "data-cy": "customer-name-error" } as any}
          />
          <TextField
            id="address"
            type="address"
            name="address"
            label="Address"
            autoComplete="street-address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.address && formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            inputProps={{ "data-cy": "customer-address" }}
            FormHelperTextProps={{ "data-cy": "customer-address-error" } as any}
          />
          <Container
            sx={{
              padding: "0 !important",
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: "1rem",
            }}>
            <TextField
              id="postalcode"
              type="postalcode"
              name="postalcode"
              label="Postal code"
              autoComplete="postal-code"
              value={formik.values.postalcode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(
                formik.touched.postalcode && formik.errors.postalcode
              )}
              helperText={formik.touched.postalcode && formik.errors.postalcode}
              inputProps={{ "data-cy": "customer-zipcode" }}
              FormHelperTextProps={
                { "data-cy": "customer-zipcode-error" } as any
              }
              sx={{ flex: 1 }}
            />
            <TextField
              id="city"
              type="city"
              name="city"
              label="City"
              autoComplete="address-level2"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.city && formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
              inputProps={{ "data-cy": "customer-city" }}
              FormHelperTextProps={{ "data-cy": "customer-city-error" } as any}
              sx={{ flex: 1 }}
            />
          </Container>
          <TextField
            id="phonenumber"
            type="phonenumber"
            name="phonenumber"
            label="Phone number"
            autoComplete="tel"
            value={formik.values.phonenumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(
              formik.touched.phonenumber && formik.errors.phonenumber
            )}
            helperText={formik.touched.phonenumber && formik.errors.phonenumber}
            inputProps={{ "data-cy": "customer-phone" }}
            FormHelperTextProps={{ "data-cy": "customer-phone-error" } as any}
          />
          <Divider
            sx={{
              backgroundColor: theme.palette.primary.main,
              marginBottom: "2rem",
              marginTop: "1rem",
            }}></Divider>
          <PurchaseConfirmation />
        </form>
      </Container>
    </Container>
  );
}

const rootStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

export default DeliveryForm;

import { Box, Container, Divider, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { CSSProperties } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useOrder } from "../contexts/OrderContext";
import PurchaseConfirmation from "./PurchaseConfirmation";

const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const DeliverySchema = Yup.object({
  email: Yup.string().email("Please enter an valid email address").required("Please enter an email address"),
  firstName: Yup.string().required("Please enter a name"),
  lastName: Yup.string().required("Please enter a name"),
  street: Yup.string().required("Please enter your address"),
  postCode: Yup.string()
    .min(5, "The postal code should be 5 numbers")
    .max(5, "The postal code should be only 5 numbers")
    .required("Please enter the postal code"),
  city: Yup.string().required("Please enter your city"),
  phoneNumber: Yup.string().required().matches(phoneRegExp, "Invalid phone number"),
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
      firstName: "",
      lastName: "",
      street: "",
      postCode: "",
      city: "",
      phoneNumber: "",
    },
    validationSchema: DeliverySchema,
    onSubmit: (address) => {
      createOrder(address);
    },
  });

  return (
    <Container maxWidth={isSmallScreen ? "sm" : "md"}>
      <Container
        sx={{
          display: "flex",
          margin: "1rem",
          padding: "0px !important",
        }}
      >
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
          }}
        >
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
        }}
      >
        <form onSubmit={formik.handleSubmit} style={rootStyle} data-cy="customer-form">
          <TextField
            id="email"
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
            id="first-name"
            name="firstName"
            label="First Name"
            autoComplete="given-name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.firstName && formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            inputProps={{ "data-cy": "customer-name" }}
            FormHelperTextProps={{ "data-cy": "customer-name-error" } as any}
          />
          <TextField
            id="last-name"
            name="lastName"
            label="Last Name"
            autoComplete="family-name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.lastName && formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            inputProps={{ "data-cy": "customer-name" }}
            FormHelperTextProps={{ "data-cy": "customer-name-error" } as any}
          />
          <TextField
            id="street"
            name="street"
            label="Street"
            autoComplete="street-address"
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.street && formik.errors.street)}
            helperText={formik.touched.street && formik.errors.street}
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
            }}
          >
            <TextField
              id="post-code"
              name="postCode"
              label="Post Code"
              autoComplete="postal-code"
              value={formik.values.postCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.postCode && formik.errors.postCode)}
              helperText={formik.touched.postCode && formik.errors.postCode}
              inputProps={{ "data-cy": "customer-zipcode" }}
              FormHelperTextProps={{ "data-cy": "customer-zipcode-error" } as any}
              sx={{ flex: 1 }}
            />
            <TextField
              id="city"
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
            name="phoneNumber"
            label="Phone Number"
            autoComplete="tel"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            inputProps={{ "data-cy": "customer-phone" }}
            FormHelperTextProps={{ "data-cy": "customer-phone-error" } as any}
          />
          <Divider
            sx={{
              backgroundColor: theme.palette.primary.main,
              marginBottom: "2rem",
              marginTop: "1rem",
            }}
          ></Divider>
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

import { Box, Button, Container, TextField, Link } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useUserContext } from "../contexts/UserContext";

const LoginSchema = Yup.object({
  email: Yup.string().email("Please enter an valid email address").required("Please enter an email address"),
  password: Yup.string().required("Please enter your password"),
});

export type LoginValues = Yup.InferType<typeof LoginSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useUserContext();

  const formik = useFormik<LoginValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (loginValues) => {
      const loggedinUser = await login(loginValues.email, loginValues.password);
      console.log(loggedinUser);
      navigate("/");
    },
  });

  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={formik.handleSubmit}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          padding={"9rem 0"}
          gap={"1rem"}
          alignItems={"center"}
          sx={{ width: "100%", maxWidth: "400px" }}
        >
          <span style={{ fontSize: "30px" }}>Log in</span>
          <TextField
            fullWidth
            id="email"
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            name="password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.password && formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button type="submit" variant="contained" sx={{ boxShadow: "none", marginTop: "1rem" }}>
            Log in
          </Button>
          <Link
            component={"button"}
            variant="body2"
            fontSize={"large"}
            color={"secondary"}
            underline="hover"
            onClick={() => navigate("/register")}
          >
            Don't have an account? <u>Sign up</u>
          </Link>
        </Box>
      </form>
    </Container>
  );
}

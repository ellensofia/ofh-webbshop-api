import { Box, Button, Container, Link, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useUserContext } from "../contexts/UserContext";

const RegisterSchema = Yup.object({
  username: Yup.string().required("Please enter a username"),
  email: Yup.string().email("Please enter an valid email address").required("Please enter an email address"),
  password: Yup.string().required("Please enter a password"),
});

export type RegisterValues = Yup.InferType<typeof RegisterSchema>;

export function RegisterFrom() {
  const navigate = useNavigate();
  const { register } = useUserContext();

  const formik = useFormik<RegisterValues>({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (registerValues) => {
      try {
        const newUser = await register(registerValues.email, registerValues.username, registerValues.password);
        if (newUser) {
          if (newUser.includes("username")) {
            formik.setFieldError("username", "This username already exists. Please choose another one.");
          }
          if (newUser.includes("email")) {
            formik.setFieldError("email", "This email already exists. Please choose another one.");
          }
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
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
          <span style={{ fontSize: "30px" }}>Create account</span>
          <TextField
            fullWidth
            id="username"
            label="Username"
            type="text"
            variant="outlined"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            fullWidth
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.password && formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button type="submit" variant="contained" sx={{ boxShadow: "none", marginTop: "1rem" }}>
            Sign up
          </Button>
          <Link
            component={"button"}
            variant="body2"
            fontSize={"large"}
            color={"secondary"}
            underline="hover"
            onClick={() => navigate("/login")}
          >
            Already have an account? <u>Log in</u>
          </Link>
        </Box>
      </form>
    </Container>
  );
}

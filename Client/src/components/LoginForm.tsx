import { Box, Button, Container, TextField, Link } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";


const LoginSchema = Yup.object({
    email: Yup.string()
      .email("Please enter an valid email address")
      .required("Please enter an email address"),
    password: Yup.string().required("Please enter your password")
  });

  export type LoginValues = Yup.InferType<typeof LoginSchema>;

export function LoginForm() {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const formik = useFormik<LoginValues>({
        initialValues: {
          email: "",
          password: "",
        },
        validationSchema: LoginSchema,
        onSubmit: (LoginValues) => {
          setEmail(LoginValues.email);
          setPassword(LoginValues.password);
          navigate("/");
        },
      });

    const handleLogin = async (e: any) => {
        e.preventDefault();
        
        const newUser = {
          email: formik.values.email,
          password: formik.values.password,
        };
        
        const response = await fetch("/api/users/login", {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: { "Content-type": "application/json" },
        });
        
        const data = await response.json();
    
        if (response.ok) {
          localStorage.setItem(
            "loggedInUsername",
            data.username
          );
          localStorage.setItem("loggedInUserID", data._id);
          localStorage.setItem("loggedInIsAdmin", data.isAdmin);
    
          navigate("/");
        }
      };

    return(
        <Container style={{ display: 'flex', justifyContent: 'center'}}>
            <Box
                display={"flex"}
                flexDirection={'column'}
                padding={'9rem 0'}
                gap={'1rem'}
                alignItems={'center'}
                sx={{ width: "100%", maxWidth: "400px" }}
                >
            <span style={{ fontSize: '30px'}}>Log in</span>
            <TextField fullWidth id="email" label="Email" type="email" name="email" variant="outlined" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} error={Boolean(formik.touched.email && formik.errors.email)} helperText={formik.touched.email && formik.errors.email}/>
            <TextField fullWidth id="password" label="Password" type="password" name="password" variant="outlined" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} error={Boolean(formik.touched.password && formik.errors.password)} helperText={formik.touched.password && formik.errors.password}/>
            <Button
                    type="submit"
                    onClick={handleLogin}
                    variant="contained"
                    sx={{ boxShadow: "none", marginTop: "1rem" }}
                >
                    Log in
                </Button>
                <Link component={'button'} variant="body2" fontSize={'large'} color={'secondary'} underline="hover" onClick={() => navigate('/register')}>Don't have an account? <u>Sign up</u></Link>
            </Box>
        </Container>
    )
}
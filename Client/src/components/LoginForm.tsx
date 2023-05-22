import { Box, Button, Container, TextField } from "@mui/material";
import { Link, NavLink } from "react-router-dom";

export function LoginForm() {
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
            <TextField fullWidth id="outlined-basic" label="Email" type="email" variant="outlined" />
            <TextField fullWidth id="outlined-basic" label="Password" type="password" variant="outlined" />
            <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    sx={{ boxShadow: "none", marginTop: "1rem" }}
                >
                    Log in
                </Button>
                <NavLink to="/register">Don't have an account? Sign up</NavLink>
            </Box>
        </Container>
    )
}
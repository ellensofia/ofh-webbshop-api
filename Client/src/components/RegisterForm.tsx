import { Box, Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export function RegisterFrom() {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleRegisterAccount = async (e: any) => {
        e.preventDefault();
    
        const newUser = {
          username,
          email,
          password,
        };
    
        const response = await fetch("/api/users/register", {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: { "Content-type": "application/json" },
        });
    
        if (response.ok) {
          setUsername("");
          setPassword("");
          setEmail("");
    
          navigate("/login");
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
                <span style={{ fontSize: '30px'}}>Create account</span>
                <TextField fullWidth id="outlined-basic" label="Username" type="text" variant="outlined" value={username} onChange={(e)=> setUsername(e.target.value)} />
                <TextField fullWidth id="outlined-basic" label="Email" type="email" variant="outlined" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <TextField fullWidth id="outlined-basic" label="Password" type="password" variant="outlined" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <Button
                    type="submit"
                    variant="contained"
                    onClick={handleRegisterAccount}
                    sx={{ boxShadow: "none", marginTop: "1rem" }}
                >
                    Sign up
                </Button>
                <NavLink to="/login" style={{ textDecoration: 'none'}}>Already have an account? Log in</NavLink>
            </Box>
        </Container>
    )
}
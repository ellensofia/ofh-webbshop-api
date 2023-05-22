import { Box, Container, TextField } from "@mui/material";

export function LoginForm() {
    return(
        <Container>
            <Box
            display={"flex"}
            flexDirection={'column'}
            padding={'9rem 0'}
            gap={'1rem'}
            alignItems={'center'}
            >
            <span style={{ fontSize: '30px'}}>Log in</span>
            <TextField id="outlined-basic" label="Email" type="email" variant="outlined" />
            <TextField id="outlined-basic" label="Password" type="password" variant="outlined" />
            </Box>
        </Container>
    )
}
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const LoginScreen = () => {
  const navigate = useNavigate();

  return (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box width={450} textAlign="center">
        <Typography variant="h4">Log-in Admin</Typography>
        <Paper>
          <Box mt={2} p={4} display="flex" gap={3} flexDirection="column">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Login"
              variant="outlined"
            />

            <TextField
              type="password"
              fullWidth
              id="outlined-basic-password"
              label="Password"
              variant="outlined"
            />

            <Button variant="contained">LOGIN</Button>
            <Button variant="text" onClick={() => navigate("/register")}>
              REGISTER
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

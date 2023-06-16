import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Button,
  Paper,
  styled,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";

const StyledBackground = styled(Box)(() => ({
  backgroundImage: `url(topo.jpg)`,
}));

export const Welcome = () => {
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  const matches = useMediaQuery("(max-width:600px)");

  return (
    <StyledBackground
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        maxWidth={1200}
        textAlign="center"
        flexDirection="column"
        display="flex"
        gap={3}
        bgcolor="rgba(255,255,255,0.5)"
        p={5}
        borderRadius={2}
      >
        <Typography variant={matches ? "h3" : "h1"} fontWeight={500}>
          Welcome to geocar!
        </Typography>
        <Box>
          <Button variant="contained" onClick={() => loginWithRedirect()}>
            Log-in
          </Button>
        </Box>
        <Box>
          <Button variant="text" onClick={() => loginWithRedirect()}>
            Sign-up
          </Button>
        </Box>
      </Box>
    </StyledBackground>
  );
};

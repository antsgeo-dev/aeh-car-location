import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { InviteUserModal } from "./IntviteUserModal";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import { useAuth0 } from "@auth0/auth0-react";

export const Header = () => {
  const [open, setOpen] = React.useState(false);
  const { logout } = useAuth0();
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container
        sx={{
          paddingLeft: "40px !important",
          paddingRight: "40px !important",
        }}
        maxWidth={false}
      >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <AgricultureIcon fontSize="large" />
          </Typography>

          <Box
            sx={{
              flexGrow: { sm: 0, md: 1 },
              display: { xs: "flex", md: "none" },
            }}
          ></Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <AgricultureIcon />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <Box display="flex" gap={2}>
              <Button
                variant="outlined"
                onClick={() => {
                  logout();
                  navigate("/welcome");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                LOG OUT
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </Container>
      <InviteUserModal open={open} setOpen={setOpen} />
    </AppBar>
  );
};

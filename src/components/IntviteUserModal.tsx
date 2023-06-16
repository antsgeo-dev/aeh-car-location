import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Slide,
  TextField,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const InviteUserModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) => (
  <Dialog
    maxWidth="lg"
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={() => setOpen(false)}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>{"Invite new user"}</DialogTitle>
    <DialogContent style={{ width: 650 }}>
      <DialogContentText id="alert-dialog-slide-description">
        <Box display="flex" pt={2} gap={3} flexDirection="column">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Name"
            variant="outlined"
          />

          <TextField
            fullWidth
            id="outlined-basic"
            label="Gender"
            variant="outlined"
          />

          <TextField
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
        </Box>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOpen(false)}>CLOSE</Button>
      <Button variant="outlined" onClick={() => setOpen(false)}>
        INVITE USER
      </Button>
    </DialogActions>
  </Dialog>
);

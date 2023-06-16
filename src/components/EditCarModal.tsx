import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Input,
  Modal,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
import { CarInfo } from "./CarTile";
import FaceIcon from "@mui/icons-material/Face";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import InputMask from "react-input-mask";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const EditCarModal = ({
  open,
  setOpen,
  car,
  onSubmit,
  onEdit,
  title,
}: {
  open: boolean;
  onSubmit: (car: Partial<CarInfo>) => void;
  onEdit: (car: Partial<CarInfo>) => void;
  setOpen: (v: boolean) => void;
  car?: CarInfo;
  title?: string;
}) => {
  const [currentCar, setCarData] = useState<Partial<CarInfo>>(car || {});

  useEffect(() => {
    car && setCarData(car);
  }, [car]);

  return (
    <Dialog
      maxWidth="lg"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {
        setCarData({});
        setOpen(false);
      }}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        {title} <b>{currentCar?.name}</b>
      </DialogTitle>
      <DialogContent style={{ width: 650 }}>
        <DialogContentText id="alert-dialog-slide-description">
          <Box display="flex" pt={2} gap={3} flexDirection="column">
            <TextField
              fullWidth
              id="outlined-basic"
              value={currentCar?.name || ""}
              onChange={(e) => {
                setCarData((v) => ({ ...v, name: e.target.value }));
              }}
              label="Car name"
              variant="outlined"
            />

            <InputMask
              mask="aa999aa"
              value={currentCar?.licensePlate || ""}
              onChange={(e) => {
                setCarData((v) => ({ ...v, licensePlate: e.target.value }));
              }}
              formatChars={{
                "9": "[0-9]",
                a: "[A-Za-z]",
              }}
              maskPlaceholder="AA999AA"
            >
              {/* @ts-ignore:next-line */}
              {(inputProps) => (
                <TextField
                  {...inputProps}
                  fullWidth
                  label=""
                  id="outlined-basic"
                  // label="License plate"
                  variant="outlined"
                />
              )}
            </InputMask>

            <TextField
              fullWidth
              id="outlined-basic"
              value={currentCar?.milage || ""}
              onChange={(e) => {
                setCarData((v) => ({ ...v, milage: e.target.value }));
              }}
              type="number"
              label="Mileage"
              variant="outlined"
            />

            <TextField
              fullWidth
              id="outlined-basic"
              value={currentCar?.color || ""}
              onChange={(e) => {
                setCarData((v) => ({ ...v, color: e.target.value }));
              }}
              label="Color"
              variant="outlined"
            />

            <TextField
              multiline
              rows={5}
              value={currentCar?.issues || ""}
              onChange={(e) => {
                // setCarData((v) => ({ ...v, issues: e.target.value }));
              }}
              label="issues"
              id="outlined-basic"
            />
            <Divider> Other info </Divider>
            <Box display="flex" gap={2}>
              <TextField
                fullWidth
                id="outlined-basic"
                value={currentCar?.lat || ""}
                label="LAT"
                variant="outlined"
                disabled
              />

              <TextField
                fullWidth
                id="outlined-basic"
                value={currentCar?.lng || ""}
                label="LNG"
                variant="outlined"
                disabled
              />
            </Box>

            {currentCar.userId ? (
              <Box display="flex" alignItems="center" gap={1}>
                <Chip icon={<FaceIcon />} label="Taken" />
                <Typography>
                  Currently taken by user {currentCar.userId}{" "}
                </Typography>
              </Box>
            ) : (
              <Box display="flex" alignItems="center" gap={1}>
                <Chip
                  icon={<AutoAwesomeIcon />}
                  color="success"
                  label="Available"
                />
                <Typography>Free to use</Typography>
              </Box>
            )}
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>CLOSE</Button>
        <Button
          variant="outlined"
          onClick={() => {
            car ? onEdit(currentCar) : onSubmit(currentCar);
            setOpen(false);
          }}
        >
          {car ? "SAVE CHANGES" : "CREATE NEW CAR"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

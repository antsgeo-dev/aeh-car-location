import { Box, Button, IconButton, styled } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { usePositionStore } from "../store";

const Wrapper = styled(Box)(
  () => `
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
  `
);

const Buttons = styled(Box)(
  () => `
    display: flex;
    height: 100%;
  `
);

export type CarInfo = {
  name: string;
  currentUser: string;
  licensePlate: string;
  milage: string;
  color: string;
  issues?: { id: string; text: string; date: Date }[];
  id: string;
  lat?: number;
  lng?: number;
  userId?: string;
};

export const CarTile = ({
  car,
  onEditCar,
  onDelete,
}: {
  car: CarInfo;
  onEditCar: (car: CarInfo) => void;
  onDelete: (id: string) => void;
}) => {
  const { setPos } = usePositionStore();

  return (
    <Wrapper p={1} px={2} mt={1}>
      <Box>{car.currentUser || car.name}</Box>
      <Buttons>
        <IconButton onClick={() => onEditCar(car)}>
          <InfoIcon />
        </IconButton>
        <IconButton onClick={() => onEditCar(car)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(car.id)} color="error">
          <CancelIcon />
        </IconButton>
        <IconButton
          onClick={() => setPos({ lat: Number(car.lat), lng: Number(car.lng) })}
        >
          <MyLocationIcon />
        </IconButton>
      </Buttons>
    </Wrapper>
  );
};

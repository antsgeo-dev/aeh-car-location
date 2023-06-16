import { Box, Paper, Slide, styled } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import React, { useEffect, useState } from "react";
import { CarTile, CarInfo } from "./CarTile";
import { EditCarModal } from "./EditCarModal";
import { storeDb } from "../utils";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import { v4 as uuidv4 } from "uuid";
import { useCarsStore } from "../store";
import { LoadingButton } from "@mui/lab";

const Container = styled(Paper)(
  () => `
    position: absolute;
    top: 110px;
    left: 40px;
    z-index: 999;
    width: 340px;
    height: 500px;
`
);

const Wrapper = styled(Box)(
  () => `
    display: grid;
    grid-template-rows: 1fr 70px;
    height: 100%;
`
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AdminSidebar = () => {
  const [open, setOpen] = React.useState(false);
  const [editCar, setEditCar] = React.useState<CarInfo>();
  const [loading, setLoading] = useState<boolean>(false);

  const { cars, setCars } = useCarsStore();

  const fetchCars = async (): Promise<void> => {
    const store = collection(storeDb, "cars");
    const items = await getDocs(store);

    const cars = items.docs.map((d) => d?.data());

    setCars(cars as CarInfo[]);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleCreateCar = async (itemData: Partial<CarInfo>): Promise<void> => {
    setLoading(true);
    // @ts-ignore:next-line
    const id = uuidv4();
    await setDoc(doc(storeDb, "cars", id), {
      ...itemData,
      id,
      lat: 0,
      lng: 0,
      dateCreated: new Date().toISOString().slice(0, 10),
    });
    fetchCars();
    setLoading(false);
  };

  const handleUpdateCar = async (data: Partial<CarInfo>): Promise<void> => {
    setLoading(true);
    // @ts-ignore:next-line
    await setDoc(doc(storeDb, "cars", data?.id), data);
    fetchCars();
    setLoading(false);
  };

  const handleDeleteCar = async (id: string): Promise<void> => {
    setLoading(true);
    // @ts-ignore:next-line
    await deleteDoc(doc(storeDb, "cars", id));
    fetchCars();
    setLoading(false);
  };

  return (
    <Container>
      <EditCarModal
        open={open || !!editCar}
        title={!!editCar ? "Edit car" : "Add new car"}
        car={editCar}
        setOpen={(v) => {
          if (v) {
            setOpen(true);
          } else {
            setEditCar(undefined);
            setOpen(false);
          }
        }}
        onSubmit={handleCreateCar}
        onEdit={handleUpdateCar}
      />
      <Wrapper p={2}>
        <Box>
          <Box>
            {cars.map((car) => (
              <CarTile
                onDelete={handleDeleteCar}
                onEditCar={setEditCar}
                car={car}
              />
            ))}
          </Box>
        </Box>

        <Box>
          <LoadingButton
            variant="contained"
            onClick={() => setOpen(true)}
            fullWidth
            loading={loading}
          >
            ADD NEW CAR
          </LoadingButton>
        </Box>
      </Wrapper>
    </Container>
  );
};

import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CarInfo } from "../components/CarTile";
import { useCarsStore, usePositionStore } from "../store";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { storeDb } from "../utils";
import { collection, doc, getDocs, setDoc } from "firebase/firestore/lite";
import { useAuth0 } from "@auth0/auth0-react";
import { MapComponent } from "../components";
import { CircularProgress } from "@mui/material";

type ActiveCar = {
  car: CarInfo;
  receipts: string[];
};

export const UserPanelScreen = () => {
  const navigate = useNavigate();
  const { cars, setCars } = useCarsStore();
  const { user } = useAuth0();
  const { setPos } = usePositionStore();
  const [assignedCar, assignCar] = useState<CarInfo | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loop, setLoop] = useState<NodeJS.Timer>();

  const fetchCars = async (): Promise<void> => {
    const store = collection(storeDb, "cars");
    const items = await getDocs(store);

    const cars = items.docs.map((d) => d?.data());

    setCars(cars as CarInfo[]);
  };

  useEffect(() => {
    const foundCar = cars.find(({ userId }) => userId === user?.sub);
    setLoading(false);
    setPos({ lat: foundCar?.lat || 0, lng: foundCar?.lng || 0 });
    foundCar ? assignCar(foundCar) : assignCar(undefined);
  }, [cars]);

  const handleBookCar = async (
    data: Partial<CarInfo>,
    lat: string,
    lng: string,
    userId: string
  ): Promise<void> => {
    // @ts-ignore:next-line
    await setDoc(doc(storeDb, "cars", data?.id), { ...data, lat, lng, userId });
    fetchCars();
  };

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    let intervalId: any;

    if (assignedCar && !loop) {
      intervalId = setInterval(() => {
        console.log("upd");
        navigator.geolocation.getCurrentPosition((p) => {
          handleBookCar(
            assignedCar,
            `${p.coords.latitude}`,
            `${p.coords.longitude}`,
            user?.sub as string
          );
        });
      }, 10000);
    }

    return () => clearInterval(intervalId);
  }, [assignedCar, loop]);

  return (
    <div className="App">
      {!assignedCar && (
        <Box mt={2}>
          <Typography variant="h6">Available cars: </Typography>
        </Box>
      )}

      {loading && !assignedCar && (
        <Box mt={5}>
          <CircularProgress />
        </Box>
      )}

      {!assignedCar &&
        !loading &&
        cars.map((car) => {
          return (
            !car.userId && (
              <Card
                sx={{
                  minWidth: 275,
                  maxWidth: 300,

                  margin: "0 auto",
                  marginBottom: "25px",
                  marginTop: "25px",
                }}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {car.currentUser}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {car.name}, {car.licensePlate}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {car.milage} km
                  </Typography>
                  <Typography variant="body2">
                    {car?.issues?.[0].text}
                  </Typography>
                </CardContent>
                <CardActions>
                  <LoadingButton
                    fullWidth
                    color="success"
                    variant="contained"
                    size="small"
                    loading={loading}
                    onClick={() => {
                      setLoading(true);
                      navigator.geolocation.getCurrentPosition((p) => {
                        handleBookCar(
                          car,
                          `${p.coords.latitude}`,
                          `${p.coords.longitude}`,
                          user?.sub as string
                        );
                      });
                    }}
                  >
                    BOOK
                  </LoadingButton>
                </CardActions>
              </Card>
            )
          );
        })}

      {assignedCar && (
        <Card
          sx={{
            width: "90vw",
            left: "5vw",
            position: "absolute",
            zIndex: 99,
            bottom: 20,
          }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {assignedCar.currentUser}
            </Typography>
            <Typography variant="h5" component="div">
              {assignedCar.name}, {assignedCar.licensePlate}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {assignedCar.milage} km
            </Typography>
            <Typography variant="body2">
              {assignedCar?.issues?.[0].text}
            </Typography>
          </CardContent>
          <CardActions>
            <LoadingButton
              fullWidth
              color="error"
              variant="contained"
              size="small"
              loading={loading}
              onClick={() => {
                setLoading(true);
                clearInterval(loop);
                navigator.geolocation.getCurrentPosition((p) => {
                  handleBookCar(
                    assignedCar,
                    `${p.coords.latitude}`,
                    `${p.coords.longitude}`,
                    ""
                  );
                });
              }}
            >
              LEAVE
            </LoadingButton>
          </CardActions>
        </Card>
      )}

      {assignedCar && <MapComponent showId={assignedCar.userId} />}
    </div>
  );
};

import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import RoomIcon from "@mui/icons-material/Room";
import { useCarsStore, usePositionStore } from "../store";
import { Badge, Box, styled } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  showId?: string;
};

const StyledMarker = styled(Box)`
  @keyframes a {
    0% {
      box-shadow: 0 0 0 8px rgba(238, 107, 63, 0.25),
        0 0 0 0px rgba(238, 107, 63, 0.25);
    }
    50% {
      box-shadow: 0 0 0 16px rgba(238, 107, 63, 0),
        0 0 0 8px rgba(238, 107, 63, 0.25);
    }
    50.0001% {
      box-shadow: 0 0 0 0 rgba(238, 107, 63, 0.25),
        0 0 0 8px rgba(238, 107, 63, 0.25);
    }
    100% {
      box-shadow: 0 0 0 8px rgba(238, 107, 63, 0.25),
        0 0 0 16px rgba(238, 107, 63, 0);
    }
  }

  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin: 60px auto;
  background: #ee6b3f;
  box-shadow: 0 0 0 16px rgba(238, 107, 63, 0.25),
    0 0 0 32px rgba(238, 107, 63, 0.25);
  animation: a 1.6s linear infinite;
`;

export const MapComponent = ({ showId }: Props) => {
  const { position } = usePositionStore();
  const { cars } = useCarsStore();
  const markers = cars
    .filter((c) => (showId ? showId === c.userId : true))
    ?.map((c) => {
      if (c.lng === 0 && c.lat === 0) return null;

      return (
        <Marker key={c.id} color="red" longitude={c.lng} latitude={c.lat}>
          {showId ? (
            <StyledMarker />
          ) : (
            <Badge badgeContent={c.name}>
              <RoomIcon color="error" fontSize="large" />
            </Badge>
          )}
        </Marker>
      );
    });

  const [viewState, setViewState] = useState({
    longitude: cars[0]?.lng,
    latitude: cars[0]?.lat,
    zoom: 3.5,
  });

  useEffect(() => {
    viewState.longitude === 0 &&
      viewState.latitude === 0 &&
      setViewState((v) => ({
        zoom: 14,
        latitude: cars[0]?.lat || 0,
        longitude: cars[0]?.lng || 0,
      }));
  }, [cars]);

  useEffect(() => {
    setViewState((v) => ({
      zoom: 14,
      latitude: position.lat || 0,
      longitude: position.lng || 0,
    }));
  }, [position]);

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {markers}
    </Map>
  );
};

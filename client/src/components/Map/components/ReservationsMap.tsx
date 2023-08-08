import { useEffect, useState } from "react";
import { Map as PigeonMap, Marker, Point, Bounds } from "pigeon-maps";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { IReservation } from "types/IReservation";
import {
  reservationsActions,
  selectReservation,
} from "store/reservations/reservationsSlice";

const defaultCenter: Point = [30.263388054689116, 31.467801829593242];
const defaultZoom: number = 8;

export default function ReservationsMap() {
  const { reservations, selected } = useAppSelector(selectReservation);

  const dispatch = useAppDispatch();

  const [center, setCenter] = useState<Point>(defaultCenter);

  const [bounds, setBounds] = useState<Bounds>();

  const [zoom, setZoom] = useState<number>(defaultZoom);

  console.log(bounds);

  const onBoundariesChangeHandler = ({
    center,
    zoom,
    bounds,
  }: {
    center: [number, number];
    bounds: Bounds;
    zoom: number;
  }) => {
    setCenter(center);
    setBounds(bounds);
    setZoom(zoom);
  };

  useEffect(() => {
    if (selected) {
      const flyTo = [
        selected.place.location.coordinates[1],
        selected.place.location.coordinates[0],
      ] as Point;
      setCenter(flyTo);
      setZoom(8);
    } else {
      setCenter(defaultCenter);
      setZoom(defaultZoom);
    }
  }, [selected]);

  const places = reservations.reduce((acc: IReservation[], reservation) => {
    if (acc.find((res) => res.place.id === reservation.place.id)) {
      acc.push(reservation);
    }
    return acc;
  }, []);

  const setFocused = (id: string) => {
    dispatch(reservationsActions.setSelected(id));
  };

  return (
    <div className="flex-grow flex-shrink min-h-0">
      <PigeonMap
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        center={center}
        onBoundsChanged={onBoundariesChangeHandler}
        maxZoom={16}
        minZoom={4}
        zoom={zoom}
      >
        {places.map((place) => {
          return (
            <Marker
              key={place.id}
              width={30}
              anchor={[
                place.place.location.coordinates[1],
                place.place.location.coordinates[0],
              ]}
              onClick={() => setFocused(place.id)}
            />
          );
        })}
      </PigeonMap>
    </div>
  );
}

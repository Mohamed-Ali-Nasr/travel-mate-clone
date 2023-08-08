import { useEffect, useState } from "react";
import { Map as PigeonMap, Marker, Point, Bounds } from "pigeon-maps";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { IPlace } from "types/IPlace";
import { placesActions, selectPlaces } from "store/places/placesSlice";

const defaultCenter: Point = [30.263388054689116, 31.467801829593242];
const defaultZoom: number = 8;

export default function Map() {
  const dispatch = useAppDispatch();

  const { places, focused } = useAppSelector(selectPlaces);

  const setFocused = (place: IPlace | null) =>
    dispatch(placesActions.setFocused(place));

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
    if (focused) {
      const flyTo = [
        focused.location.coordinates[1],
        focused.location.coordinates[0],
      ] as Point;
      setCenter(flyTo);
      setZoom(8);
    } else {
      setCenter(defaultCenter);
      setZoom(defaultZoom);
    }
  }, [focused]);

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
              width={40}
              anchor={[
                place.location.coordinates[1],
                place.location.coordinates[0],
              ]}
              onClick={() => setFocused(place)}
              color="#1d4ed8"
            />
          );
        })}
      </PigeonMap>
    </div>
  );
}

import { Map as PigeonMap, Marker } from "pigeon-maps";

interface Props {
  coordinates?: [number, number];
  setCoordinates: (coordinates: [number, number]) => void;
}

const Map = ({ coordinates, setCoordinates }: Props) => {
  const handleMapClick = ({ latLng }: { latLng: [number, number] }) => {
    setCoordinates(latLng);
  };

  return (
    <div className="w-full h-[250px] select-none">
      <PigeonMap center={[0, 0]} zoom={1} onClick={handleMapClick}>
        {coordinates && (
          <Marker anchor={coordinates} payload={1} color="#be3131" />
        )}
      </PigeonMap>
    </div>
  );
};

export default Map;

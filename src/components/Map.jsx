import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../Contexts/CitiesContext";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  //this is also the hook that react hook gives us - hwich is used to navigate to a certain page with out using Link or NavLink shits
  //the process is called programmatic navigation
  //we use  it in FORM SUBMITTING
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([49, -3.5]);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [lat, lng] = useUrlPosition();
  console.log(lat, lng);

  useEffect(
    function () {
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapContainer}>
        {/* {!geolocationPosition && (
          <Button type="position" onClick={getPosition}>
            {isLoadingPosition ? "loading..." : "use your position "}
          </Button>
        )} */}
        <MapContainer
          center={mapPosition}
          zoom={6}
          scrollWheelZoom={true}
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />

          {cities.map((city) => (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.emoji}</span> <span>{city.cityName} </span>
              </Popup>
            </Marker>
          ))}

          {/* this is the created component by ourselves to change the center of the map to the curently seleced city */}
          <ChangeCenter position={mapPosition} />
          <DetectClick />
        </MapContainer>
      </div>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap(); //the useMap hook is given for us by leaflet that tells us the current instance of the map. it returns an object contains the position array and the zoom level
  map.setView(position, 6); //the second property which is the zoom is optional

  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  //this function is for opening the form when the map is clicked
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;

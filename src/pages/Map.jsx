import React, { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const searchBox = useRef(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      setSelectedAddress(address);
      setCurrentLocation(latLng);
    } catch (error) {
      console.error("Error retrieving location:", error);
    }
  };

  const handleMarkerDragEnd = (event) => {
    const { latLng } = event;
    setCurrentLocation({ lat: latLng.lat(), lng: latLng.lng() });

    // Retrieve address based on latitude and longitude using the Geocoding API
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK" && results[0]) {
        setSelectedAddress(results[0].formatted_address);
      } else {
        console.error("Geocoder failed:", status);
      }
    });
  };

  return (
    <>
      <LoadScript
        googleMapsApiKey="AIzaSyCzrldKmjtv1ekB_OCfYMAhHqSYvhKYGbQ"
        libraries={["places"]}
      >
        <div>
          <div>
            <StandaloneSearchBox
              onLoad={(ref) => (searchBox.current = ref)}
              onPlacesChanged={() => {
                const places = searchBox.current.getPlaces();
                if (places.length > 0) {
                  handleSelect(places[0].formatted_address);
                }
              }}
            >
              <input
                type="text"
                placeholder="Search Places..."
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `100%`,
                  height: `32px`,
                  padding: `0 12px`,
                  borderRadius: `3px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `14px`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                }}
              />
            </StandaloneSearchBox>
          </div>
          <div style={{ height: "400px", width: "100%" }}>
            <GoogleMap
              mapContainerStyle={{
                height: "100%",
                width: "100%",
              }}
              center={currentLocation}
              zoom={10}
            >
              {currentLocation && (
                <Marker
                  position={currentLocation}
                  draggable={true}
                  onDragEnd={handleMarkerDragEnd}
                />
              )}
            </GoogleMap>
          </div>
        </div>
        <button onClick={getCurrentLocation}>Locate Me</button>
        <p>Selected Address: {selectedAddress}</p>
      </LoadScript>
    </>
  );
};

export default Map;

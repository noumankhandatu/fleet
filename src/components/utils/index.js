let lable = "";

export const center = { lat: 33.5651, lng: 73.0169 };
export const googleMapsLibraries = ["places"];
export const myApiKey = import.meta.env.VITE_MAP_KEY;
export const directionOptions = {
  suppressMarkers: true,
  suppressInfoWindow: true,
};

// export const customMarkerIcon = (label) => ({
//   url: `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=${label}|FF0000|000000`,
//   scaledSize: new window.google.maps.Size(30, 50),
// });

// style
export const styleBox = { mt: 2, display: "flex", alignItems: "center", gap: 1 };

export const customMarkerIcon = (placeIdLocations, location, index, color) => {
  if (location.lat === placeIdLocations[0].lat && location.lng === placeIdLocations[0].lng) {
    lable = "S";
  } else if (
    location.lat === placeIdLocations[placeIdLocations.length - 1].lat &&
    location.lng === placeIdLocations[placeIdLocations.length - 1].lng
  ) {
    lable = "E";
  } else {
    lable = index;
  }
  return {
    url: `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=${lable}|${color}|000000`,
    scaledSize: new window.google.maps.Size(30, 50),
  };
};

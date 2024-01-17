export const center = { lat: 33.5651, lng: 73.0169 };
export const googleMapsLibraries = ["places"];
export const myApiKey = import.meta.env.VITE_MAP_KEY;
export const options = {
  zoomControl: true,
  streetViewControl: true,
  mapTypeControl: true,
  fullscreenControl: true,
};
export const directionOptions = {
  suppressMarkers: true,
  suppressInfoWindow: true,
};

export const customMarkerIcon = (label) => ({
  url: `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=${label}|FF776B|000000`,
  scaledSize: new window.google.maps.Size(40, 60),
});

// style
export const styleBox = { mt: 2, display: "flex", alignItems: "center", gap: 1 };

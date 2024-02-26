// import { useState, useEffect } from "react";
// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { toast } from "react-toastify";
// import { IconButton } from "@mui/material";

// const AllRouteSearchableSelect = () => {
//   const [options, setOptions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [value, setValue] = useState(null);

//   const authToken = useSelector((state) => state?.auth.token);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           "https://portal.reliabletiredisposalhq.com/api/all-routes",
//           {
//             headers: {
//               Authorization: `Bearer ${authToken}`,
//             },
//           }
//         );
//         const result = response.data;
//         if (result.data) {
//           setOptions(result.data);
//         } else {
//           console.error("Error fetching data:", result.message);
//         }
//       } catch (error) {
//         console.error("An error occurred while fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [authToken]);

//   const handleDeleteRoute = async (id) => {
//     try {
//       const response = await axios.get(
//         `https://portal.reliabletiredisposalhq.com/api/delete-route/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
//       if (response.status === 200) {
//         toast.success("Route deleted successfully");
//       }
//       setOptions((prevRoutes) => prevRoutes.filter((route) => route.id !== id));
//     } catch (error) {
//       console.error("Error deleting route:", error);
//     }
//   };
//   return (
//     <div>
//       <Autocomplete
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//         isOptionEqualToValue={(option, value) => option.id === value?.id}
//         renderInput={(params) => <TextField {...params} label="All Routes" variant="outlined" />}
//         loading={loading}
//         options={options}
//         getOptionLabel={(option) => option.route_name}
//         renderOption={(props, option) => (
//           <li {...props} style={{ display: "flex", justifyContent: "space-between" }}>
//             <div>{option.route_name}</div>
//             <IconButton onClick={() => handleDeleteRoute(option.id)}>
//               <DeleteIcon sx={{ color: "red" }} />
//             </IconButton>
//           </li>
//         )}
//       />
//     </div>
//   );
// };

// export default AllRouteSearchableSelect;

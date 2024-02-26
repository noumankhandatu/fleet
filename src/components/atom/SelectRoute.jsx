import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDriverOrderId } from "../../toolkit/slices/DriverOrderId";

const AllRouteSearchableSelect = () => {
  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const authToken = useSelector((state) => state?.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://portal.reliabletiredisposalhq.com/api/all-routes",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const result = response.data;
        if (result.data) {
          setOptions(result.data);
        } else {
          console.error("Error fetching data:", result.message);
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken]);

  const handleSendId = (id) => {
    if (id) {
    //   dispatch(setDriverOrderId(id));
    }
  };
  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          handleSendId(newValue?.id);
        }}
        isOptionEqualToValue={(option, value) => option.id === value?.id} // Use strict comparison
        renderInput={(params) => <TextField {...params} label="All Routes" variant="outlined" />}
        loading={loading}
        options={options}
        getOptionLabel={(option) => option.route_name} // Corrected from option.name
        renderOption={(props, option) => (
          <li {...props}>
            <div>{option.route_name}</div> {/* Corrected from option.name */}
          </li>
        )}
      />
    </div>
  );
};

export default AllRouteSearchableSelect;

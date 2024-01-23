import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useSelector } from "react-redux";

const SearchableSelect = () => {
  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const authToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://portal.reliabletiredisposalhq.com/api/get-all-drivers",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const result = response.data;

        if (result.status) {
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

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      options={options}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField {...params} placeholder="Search and select Driver" variant="outlined" />
      )}
      loading={loading}
      renderOption={(props, option) => (
        <li {...props}>
          <div>{option.name}</div>
          <div>{option.email}</div>
        </li>
      )}
    />
  );
};

export default SearchableSelect;

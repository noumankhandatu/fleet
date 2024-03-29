import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectDriverOrderId } from "../../toolkit/slices/DriverOrderId";
import { setOrderIds } from "../../toolkit/slices/routes/createRouteSlice";

const SearchOrderNumber = () => {
  // states
  const [value, setValue] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // redux
  const authToken = useSelector((state) => state.auth.token);
  const DriverOrderId = useSelector(selectDriverOrderId);

  // hooks
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://portal.reliabletiredisposalhq.com/api/driver-orders/${DriverOrderId}`,
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
          setError(result.message);
        }
      } catch (error) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken, DriverOrderId]);

  useEffect(() => {
    const orderIdsString = value.map((item) => item.id).join(",");
    dispatch(setOrderIds(orderIdsString));
  }, [dispatch, value]);
  return (
    <div>
      <Autocomplete
        multiple
        id="orderNumber"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        options={options}
        getOptionLabel={(option) =>
          `${DriverOrderId} - ${option.load_type} - ${option.customer.business_name}`
        }
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search and Select Order No"
            variant="outlined"
            value={value
              .map((v) => `${v.id} - ${v.load_type} - ${v.customer.business_name}`)
              .join(", ")}
          />
        )}
        loading={loading}
        noOptionsText={error || "No matching orders"}
        renderOption={(props, option) => (
          <li key={option.id} {...props}>
            <b>{DriverOrderId}</b>
            <div style={{ marginLeft: "10px", marginRight: "10px" }}>
              {option.customer.business_name}
            </div>
            <div>{option.load_type}</div>
          </li>
        )}
      />
    </div>
  );
};

export default SearchOrderNumber;

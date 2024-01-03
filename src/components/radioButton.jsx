import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/system/Box";

export default function RadioButtons() {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Assign Route to</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="Driver" control={<Radio />} label="Driver" />
        <FormControlLabel value="Vehical" control={<Radio />} label="Vehical" />
        <FormControlLabel value="unassigned" control={<Radio />} label="unassigned" />
      </RadioGroup>
    </FormControl>
  );
}

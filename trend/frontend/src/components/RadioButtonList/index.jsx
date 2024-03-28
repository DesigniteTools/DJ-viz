import { FormControl, Radio, RadioGroup, FormControlLabel } from "@mui/material";

export default function RadioButtonList({ keys, onOptionSelect }) {
  function handleOptionChange(event) {
    onOptionSelect(event.target.value);
  }

  return (
    <div className="center">
      <FormControl>
        <h2 className="pd-t center">Metrics</h2>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={"NOF"}
          name="radio-buttons-group"
          onChange={handleOptionChange}>
          {keys.map((value, index) => (
            <FormControlLabel key={index} value={value} control={<Radio />} label={value} />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}
import { FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from "@mui/material";

export default function RadioButtonList({ values, onOptionSelect }) {
  const handleOptionChange = (event) => {
    onOptionSelect(event.target.value);
  };

  return (
    <div className="bullet-list">
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Type Metrics</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={"NOF"}
          name="radio-buttons-group"
          onChange={handleOptionChange}>
          {values.map((value, index) => (
            <FormControlLabel key={index} value={value} control={<Radio />} label={value} />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

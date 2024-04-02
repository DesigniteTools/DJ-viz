import { FormControl, Radio, RadioGroup, FormControlLabel } from "@mui/material";

export default function RadioButtonList({ keys, onOptionSelect, heading, active }) {
  const keyNames = keys.map((key) => key.replace(/([a-z])([A-Z])/g, "$1 $2"));

  function handleOptionChange(event) {
    onOptionSelect(event.target.value.replace(/\s+/g, ""));
  }

  return (
    <div className="center">
      <FormControl>
        <h2 className="pd-t center">{heading}</h2>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={active}
          name="radio-buttons-group"
          onChange={handleOptionChange}>
          {keyNames.map((value, index) => (
            <FormControlLabel key={index} value={value} control={<Radio />} label={value} />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

import { TextField } from "@mui/material";

export default function InputField(props) {
  return <TextField id="outlined-basic" label={props.placeHolder} variant="outlined" />;
}

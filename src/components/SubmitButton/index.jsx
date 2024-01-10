import { Button } from "@mui/material";

export default function SubmitButton(props) {
  return (
    <Button variant="contained" color="success">
      {props.name}
    </Button>
  );
}

import "./styles.css";
import InputField from "../../components/InputField";
import SubmitButton from "../../components/SubmitButton";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Hi!</h1>
      <div className="input-field">
        <InputField placeHolder="Path" />
      </div>
      <div className="submit-button">
        <SubmitButton name="Submit" />
      </div>
    </div>
  );
}

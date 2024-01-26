import "./styles.css";
import { useEffect } from "react";
// import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useCsvData } from "../../context";
// import CustomCard from "../../components/CustomCard";
import SmellsGraph from "../../components/SmellsGraph";
import { useNavigate } from "react-router";

export default function Visualization() {
  // const [selectedOption, setSelectedOption] = useState("");
  // const [dropdownOptions, setDropdownOptions] = useState([]);
  // const [chartData, setChartData] = useState({});
  const { csvData } = useCsvData();
  const checkCsvData = Object.keys(csvData).length === 0;
  console.log(checkCsvData);
  // console.log(Object.keys(csvData));

  const navigate = useNavigate();

  useEffect(() => {
    if (checkCsvData) {
      navigate("/");
    }
  }, [csvData]);

  // useEffect(() => {
  //   const dropdownOptions = Object.keys(csvData);
  //   setDropdownOptions(dropdownOptions);
  // }, [csvData]);

  // const handleOptionChange = (event) => {
  //   const selectedFile = event.target.value;
  //   setSelectedOption(selectedFile);

  //   const selectedFileData = csvData[selectedFile];
  //   // TODO: remove this console.log
  //   // console.log(csvData);
  //   console.log(selectedFileData);
  // };

  return (
    <div className="visualization">
      <h1 style={{ textAlign: "center" }}>Visualization</h1>
      <div className="dropdown">
        {/* <CustomCard> */}
        <SmellsGraph data={csvData} />
        {/* </CustomCard> */}
        {/* <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel>Select File</InputLabel>
          <Select value={selectedOption} onChange={handleOptionChange} label="Select File">
            {dropdownOptions.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
      </div>
    </div>
  );
}

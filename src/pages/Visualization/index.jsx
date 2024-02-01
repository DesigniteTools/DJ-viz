import "./styles.css";
import { useEffect } from "react";
// import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useCsvData } from "../../context";
// import CustomCard from "../../components/CustomCard";
import SmellsGraph from "../../components/SmellsGraph";
import { useNavigate } from "react-router";
import PiChart from "../../components/PiChart";

export default function Visualization() {
  // const [selectedOption, setSelectedOption] = useState("");
  // const [dropdownOptions, setDropdownOptions] = useState([]);
  // const [chartData, setChartData] = useState({});
  const { csvData } = useCsvData();
  // console.log("Csv Data hereeee", csvData);
  // console.log(Object.keys(csvData));

  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(csvData).length === 0) {
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

  const architectureSmellsData = csvData.ArchitectureSmells;
  const designSmellData = csvData.DesignSmells;
  const testSmellData = csvData.TestSmells;
  const implementationSmellData = csvData.ImplementationSmells;
  const testabilitySmellData = csvData.TestabilitySmells;

  const architectureSmellCount = aggregateData(architectureSmellsData, "Architecture Smell");
  const designSmellCount = aggregateData(designSmellData, "Design Smell");
  const testSmellCount = aggregateData(testSmellData, "Test Smell");
  const implementationSmellCount = aggregateData(implementationSmellData, "Implementation Smell");
  const testabilitySmellCount = aggregateData(testabilitySmellData, "Testability Smell");

  function aggregateData(data, key) {
    if (!data || data.length === 0) {
      return [];
    }
    const aggregated = {};
    data.forEach((entry) => {
      const value = entry[key];
      if (!aggregated[value]) {
        aggregated[value] = 1;
      } else {
        aggregated[value]++;
      }
    });
    return Object.entries(aggregated).map(([name, value]) => ({ name, value }));
  }

  window.onbeforeunload = function () {
    return "You will be redirected to the main page. Do you want to reload?";
  };

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#FF5733", "#33FFC7"];

  return (
    <div className="visualization">
      <h1 style={{ textAlign: "center" }}>Visualization</h1>
      <div className="dropdown">
        {/* <CustomCard> */}
        <SmellsGraph data={csvData} />
        <PiChart data={architectureSmellCount} title="Architecture Smell" colors={colors} />
        <PiChart data={designSmellCount} title="Design Smell" colors={colors} />
        <PiChart data={testSmellCount} title="Test Smell" colors={colors} />
        <PiChart data={testabilitySmellCount} title="Testability Smell" colors={colors} />
        <PiChart data={implementationSmellCount} title="Implmentation Smell" colors={colors} />
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

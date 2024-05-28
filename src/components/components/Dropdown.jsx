import { Select, FormControl, MenuItem, InputLabel } from "@mui/material";

const Dropdown = ({ chartType, setChartType, clicked, setClicked }) => {
  const handleChange = (event) => {
    setChartType(event.target.value);
  };
  const handleClick = (event) => {
    setClicked(!clicked);
  };
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="chart-type-select-label">Chart Type</InputLabel>
        <Select
          labelId="chart-type-select-label"
          id="chart-type-select"
          value={chartType}
          label="Chart Type"
          onChange={handleChange}
        >
          <MenuItem value={0}>Inflation</MenuItem>
          <MenuItem value={1}>Rate of Change</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default Dropdown;

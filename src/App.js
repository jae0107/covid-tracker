import { FormControl, MenuItem, Select } from '@material-ui/core';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="app__header">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="app__dropdown" >
          <Select variant="outlined" value="abc">
            <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Option two</MenuItem>
            <MenuItem value="worldwide">Option three</MenuItem>
            <MenuItem value="worldwide">Option four</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Header */}
      {/* Title + Select input dropdown field */}

      {/* InfoBoxs */}
      {/* InfoBoxs */}
      {/* InfoBoxs */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;

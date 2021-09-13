import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) =>  {
          const countries = data.map((country) => ({
            name: country.country, // Full name of countriåes
            value: country.countryInfo.iso2 // UK, US, ID, KR etc
          }));

          setCountries(countries);
        })
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    console.log(countryCode);
    setCountry(countryCode);
  };

  return (
    <div className="App">
      <div className="app__header">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="app__dropdown" >
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
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

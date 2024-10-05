import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Papa from 'papaparse';
import CustomStyles from '../../styles/SearchBar/SearchBarStyle.js';
import './SearchBarEstimator.css';
import planetsCSV from '/src/datasets/all_exoplanets_2021.csv';
import { ScanSearch, X } from 'lucide-react';

export default function SearchBarEstimator({ onSelectPlanet }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [planetOptions, setPlanetOptions] = useState([]);

  useEffect(() => {
    fetch(planetsCSV)
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          header: true,
          complete: function (results) {
            const uniquePlanets = results.data.map((item, index) => ({
              label: item['Planet Name'],
              value: index + 1,
              distance: item['Distance'],
              mass: item['Mass'],
              discoveryMethod: item['Discovery Method'],
              discoveryYear: item['Discovery Year'],
              discoveryFacility: item['Discovery Facility'],
              equilibriumTemperature: item['Equilibrium Temperature'],
              stellarRadius: item['Stellar Radius'],
              eccentricity: item['Eccentricity'],
            }));
            setPlanetOptions(uniquePlanets);
          },
        });
      });
  }, []);

  return (
    <div>
      <div className="search--bar">
        <Select
          placeholder="Select an Exoplanet"
          options={planetOptions}
          styles={CustomStyles}
          classNamePrefix="Select"
          onChange={(selectedOption) => {onSelectPlanet(selectedOption); console.log(selectedOption);
          }}
        />
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { CSVReader } from 'react-papaparse';

const DataTable = () => {
  const [csvData, setCsvData] = useState([]);

  const handleFileLoad = (data) => {
    setCsvData(data);
  };

  return (
    <div>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            {csvData[0] && Object.keys(csvData[0]).map((header, index) => <th key={index}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

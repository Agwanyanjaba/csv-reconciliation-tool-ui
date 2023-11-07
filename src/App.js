import React, { useState, useEffect } from "react";
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const App = () => {
  const currentYear = new Date().getFullYear();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [summary, setSummary] = useState({
    missingInTarget: 0,
    missingInSource: 0,
    fieldDiscrepancies: 0,
  });
  const [figures, setFigures] = useState([]);

  const handleSubmit = async (e) => {
    // prevent the page from reloading
    e.preventDefault();

    // construct form data
    const formData = new FormData();
    const sourceFile = e.currentTarget.querySelector('input[name="file"]').files[0];
    const targetFile = e.currentTarget.querySelector('input[name="file"]').files[1];
    formData.append('sourceFile', sourceFile, 'source.csv');
    formData.append('targetFile', targetFile, 'target.csv');

    // make a POST request with Axios
    try {
      const res = await axios.post('https://ms-csv-recon-tool.onrender.com/v1/data-tool/reconciliation', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res);
      if (res.status === 200) {
        setShowSuccessMessage(true);
      }

      const data = res.data;
      const reconciliationData = {
        missingInTarget: data[1].split(": ")[1],
        missingInSource: data[2].split(": ")[1],
        fieldDiscrepancies: data[3].split(": ")[1],
      };
      setSummary(reconciliationData);

      const extractedFigures = data
        .filter(item => item.includes(':'))
        .map(item => {
          const [label, value] = item.split(':');
          return { name: label.trim(), value: parseInt(value.trim()) || 0 };
        });

      setFigures(extractedFigures);

    } catch (error) {
      console.error('Error fetching reconciliation data:', error);
    }
  };

  return (
    <div>
      <div style={{ height: '100px', backgroundColor: 'maroon' }}>
        {/* Header */}
      </div>
      <div style={{ height: '610px', backgroundColor: 'white', display: 'flex' }}>
        {/* Middle Section */}
        <div style={{ display: 'flex', flex: '3', flexDirection: 'row' }}>
          <div style={{ flex: '3', border: '1px solid black', margin: '10px', padding: '10px' }}>
            <h2>Welcome, Upload two files to reconcile...</h2>
            <p>Please select two files</p>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
              <input type='file' name='file' multiple />
              <button type='submit'>Submit Files</button>
            </form>
            <div>{showSuccessMessage && <p>Files submitted successfully</p>}</div>
          </div>
          <div style={{ flex: '3', border: '1px solid black', margin: '10px', padding: '10px' }}>
            <h2>Reconciliation Summary</h2>
            <p>Records missing in target: {summary.missingInTarget}</p>
            <p>Records missing in source: {summary.missingInSource}</p>
            <p>Records with field discrepancies: {summary.fieldDiscrepancies}</p>
          </div>
          <div style={{ flex: '4', border: '1px solid black', margin: '10px', padding: '10px' }}>
            <h2>Visualization</h2>
            <div style={{ width: '100%', height: 400 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={figures}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          height: '50px',
          backgroundColor: 'black',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        &copy; {currentYear} Wycliffe O.
      </div>
    </div>
  );
};

export default App;

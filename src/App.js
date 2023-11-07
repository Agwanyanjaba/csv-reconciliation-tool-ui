import React, { useState, useEffect } from "react";

const App = () => {
  const currentYear = new Date().getFullYear();
  const [summary, setSummary] = useState({
    missingInTarget: 0,
    missingInSource: 0,
    fieldDiscrepancies: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8088/v1/data-tool/reconciliation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        const data = await response.json();
        setSummary(data);
      } catch (error) {
        console.error("Error fetching reconciliation data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <div style={{ height: '100px', backgroundColor: 'maroon' }}> {/* Header */}
      </div>
      <div style={{ height: '610px', backgroundColor: 'white', display: 'flex' }}>
        {/* Middle Section */}
        <div style={{ display: 'flex', flex: '3', flexDirection: 'row' }}>
          <div style={{ flex: '3', border: '1px solid black', margin: '10px' }}>
            <h2>Welcome, Upload two files to reconcile...</h2>
            <p>Please select two files</p>
           
            <p>Records submitted succssfully</p>
          </div>
          <div style={{ flex: '3', border: '1px solid black', margin: '10px' }}>
            <h2>Reconciliation Summary</h2>
            <p>Records missing in target: {summary.missingInTarget}</p>
            <p>Records missing in source: {summary.missingInSource}</p>
            <p>Records with field discrepancies: {summary.fieldDiscrepancies}</p>
          </div>
          <div style={{ flex: '4', border: '1px solid black', margin: '10px' }}>
            <h2>Visualization</h2>
          </div>
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, width: '100%', height: '50px', backgroundColor: 'black', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        &copy; {currentYear} John
      </div>
    </div>
  );
};
export default App;
import React, { useState, useEffect } from "react";

const App = () => {
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
          body: JSON.stringify({ fileesData }),
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
      <h2>Reconciliation Summary</h2>
      <p>Records missing in target: {summary.missingInTarget}</p>
      <p>Records missing in source: {summary.missingInSource}</p>
      <p>Records with field discrepancies: {summary.fieldDiscrepancies}</p>
    </div>
  );
};

export default App;
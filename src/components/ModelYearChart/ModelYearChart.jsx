import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Papa from 'papaparse';

const csvFilePath = '/Electric_Vehicle_Population_Data.csv';

function ModelYearChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: (result) => {
        const groupedData = processYearData(result.data);
        setData(groupedData);
      },
    });
  }, []);

  const processYearData = (csvData) => {
    const yearCounts = {};

    csvData.forEach((row) => {
      const year = row['Model Year'];
      if (year) {
        yearCounts[year] = (yearCounts[year] || 0) + 1;
      }
    });

    const chartData = Object.keys(yearCounts).map((year) => ({
      year: parseInt(year),
      evCount: yearCounts[year],
    }));

    chartData.sort((a, b) => a.year - b.year);

    return chartData;
  };

  return (
    <div>
      <h2>Electric Vehicle Population by Model Year (Bar Chart)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="evCount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ModelYearChart;

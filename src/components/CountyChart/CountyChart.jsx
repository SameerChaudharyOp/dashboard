import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Papa from "papaparse";

const csvFilePath = "/Electric_Vehicle_Population_Data.csv";

function CountyChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: (result) => {
        const groupedData = processCountyData(result.data);
        setData(groupedData);
      },
    });
  }, []);

  const processCountyData = (csvData) => {
    const countyCounts = {};

    csvData.forEach((row) => {
      const county = row.County;
      if (county) {
        countyCounts[county] = (countyCounts[county] || 0) + 1;
      }
    });

    const chartData = Object.keys(countyCounts).map((county) => ({
      name: county,
      evCount: countyCounts[county],
    }));

    return chartData;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="evCount" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default CountyChart;

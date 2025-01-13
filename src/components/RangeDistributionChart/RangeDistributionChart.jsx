import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Papa from "papaparse";

const csvFilePath = "/Electric_Vehicle_Population_Data.csv";

function RangeDistributionChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: (result) => {
        const groupedData = processRangeData(result.data);
        setData(groupedData);
      },
    });
  }, []);

  const processRangeData = (csvData) => {
    const rangeCounts = {
      "0-100 miles": 0,
      "101-200 miles": 0,
      "201-300 miles": 0,
      "301-400 miles": 0,
      "400+ miles": 0,
    };

    csvData.forEach((row) => {
      const range = parseFloat(row["Electric Range"]); 

      if (range <= 100) {
        rangeCounts["0-100 miles"] += 1;
      } else if (range <= 200) {
        rangeCounts["101-200 miles"] += 1;
      } else if (range <= 300) {
        rangeCounts["201-300 miles"] += 1;
      } else if (range <= 400) {
        rangeCounts["301-400 miles"] += 1;
      } else {
        rangeCounts["400+ miles"] += 1;
      }
    });

    const chartData = Object.keys(rangeCounts).map((range) => ({
      name: range,
      value: rangeCounts[range],
    }));

    return chartData;
  };

  const COLORS = ["#fbbf24", "#ff7300", "#8884d8", "#82ca9d", "#ff0000"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default RangeDistributionChart;

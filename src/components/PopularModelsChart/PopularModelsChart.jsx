import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Papa from 'papaparse';

const csvFilePath = '/Electric_Vehicle_Population_Data.csv';

function PopularModelsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: (result) => {
        const groupedData = processModelData(result.data);
        setData(groupedData);
      },
    });
  }, []);

  const processModelData = (csvData) => {
    const modelCounts = {};

    csvData.forEach(row => {
      const model = row['Make'];
      if (model) {
        modelCounts[model] = (modelCounts[model] || 0) + 1;
      }
    });

    const chartData = Object.keys(modelCounts).map(model => ({
      model: model,
      count: modelCounts[model],
    }));

    chartData.sort((a, b) => b.count - a.count);

    return chartData.slice(0, 5);
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="model" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="count" stroke="#4fd1c5" fill="#4fd1c5" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default PopularModelsChart;

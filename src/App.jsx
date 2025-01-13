import React from "react";
import CountyChart from "./components/CountyChart/CountyChart";
import ModelYearChart from "./components/ModelYearChart/ModelYearChart";
import PopularModelsChart from "./components/PopularModelsChart/PopularModelsChart";
import RangeDistributionChart from "./components/RangeDistributionChart/RangeDistributionChart";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-3">
        <h1 className="text-3xl font-bold text-center">
          Electric Vehicle Dashboard
        </h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow-md rounded">
          <h2 className="text-xl font-semibold mb-2">EVs by County</h2>
          <CountyChart />
        </div>
        <div className="bg-white p-4 shadow-md rounded">
          <h2 className="text-xl font-semibold mb-2">Popular EV Models</h2>
        <PopularModelsChart />
        </div>
        <div className="bg-white p-4 shadow-md rounded">
          <h2 className="text-xl font-semibold mb-2">
            Electric Range Distribution
          </h2>
      <RangeDistributionChart />
        </div>
        <div className="bg-white p-4 shadow-md rounded">
          <h2 className="text-xl font-semibold mb-2">EVs by Model Year</h2>
          <ModelYearChart />
        </div>
      </div>
    </div>
  );
}

export default App;

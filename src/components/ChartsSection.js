import React from 'react';
import BarChart from './charts/BarChart';
import LineChart from './charts/LineChart';
import RadarChart from './charts/RadarChart';
import ScatterChart from './charts/ScatterChart';

const ChartsSection = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Visualizaciones Interactivas</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <BarChart />
        <LineChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RadarChart />
        <ScatterChart />
      </div>
    </section>
  );
};

export default ChartsSection;

// PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';

const Piechart = ({ data }) => {
  const pieData = {
    labels: ['Total Cases', 'Recoveries', 'Deaths'],
    datasets: [
      {
        data: [data.totalCases, data.totalRecoveries, data.totalDeaths],
        backgroundColor: ['#4f46e5', 'green', 'red'],
      },
    ],
  };

  return (
    <div>
      <Pie height={900} width={900} data={pieData} />
    </div>
  );
};

export default Piechart;

// LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as Chartjs } from 'chart.js/auto';

const Linechart = ({ data }) => {
  return (
    <div>
      {data !== null ? (
        <Line  data={data} />
      ) : (
        <div>Data Not Found</div>
      )}
    </div>
  );
};

export default Linechart;

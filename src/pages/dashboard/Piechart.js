import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as Chartjs } from 'chart.js/auto';

const Piechart = ({ data }) => {
    const { totalCases, totalRecoveries, totalDeaths, population } = data;

    const pieData = {
        labels: ['Total Cases', 'Recoveries', 'Deaths', 'Population'],
        datasets: [
            {
                data: [totalCases, totalRecoveries, totalDeaths, population],
                backgroundColor: ['#4f46e5', 'green', 'red', 'orange'], 
            },
        ],
    };

    return (
        <div style={{ height: '350px', marginLeft: '100px' }}>
            <Pie data={pieData} />
        </div>
    );
};

export default Piechart;

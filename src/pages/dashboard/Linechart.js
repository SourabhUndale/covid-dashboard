import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Legend);

const Linechart = ({ timeline }) => {
    const [covidData, setCovidData] = useState(null);

    useEffect(() => {
        if (timeline) {
            const labels = Object.keys(timeline.cases);

            setCovidData({
                labels,
                  datasets: [
                    {
                        label: 'Total Cases',
                        data: Object.values(timeline.cases),
                        borderColor: '#4f46e5',
                        fill: false,
                        tension: 0.1,
                        pointBorderWidth: 0,
                        pointHoverRadius: 0,
                        pointHoverBorderWidth: 0,
                        lineWidth: 100,
                        pointRadius: 0,
                        pointHitRadius: 0,

                    },
                    {
                        label: 'Recoveries',
                        data: Object.values(timeline.recovered),
                        borderColor: 'green',
                        fill: false,
                        tension: 0.1,
                        pointBorderWidth: 0,
                        pointHoverRadius: 0,
                        pointHoverBorderWidth: 0,
                        lineWidth: 100,
                        pointRadius: 0,
                        pointHitRadius: 0,

                    },
                    {
                        label: 'Deaths',
                        data: Object.values(timeline.deaths),
                        borderColor: 'red',
                        fill: false,
                        tension: 0.1,
                        pointBorderWidth: 0,
                        pointHoverRadius: 0,
                        pointHoverBorderWidth: 0,
                        lineWidth: 100,
                        pointRadius: 0,
                        pointHitRadius: 0,
                    },
                ],
            });
        }
    }, [timeline]);

    const options = {
         responsive: true,
        scales: {
            x: {
                grid: {
                    display: true,
                    color: '#e0e0e0'
                },
                

            },
            y: {
                grid: {
                    display: true,
                    color: '#e0e0e0'
                }
            }
        },
        
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
                title: {
                    display: true,
                    text: 'Date'
                }
            
        }
    };

    return (
        <div>
            {covidData ? (
                <Line  data={covidData} options={options} />
            ) : (
                <div>Data Not Found</div>
            )}
        </div>
    );
};

export default Linechart;

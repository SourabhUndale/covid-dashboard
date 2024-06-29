// Dashbaord.js
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as Chartjs } from 'chart.js/auto';
import Piechart from './Piechart';
import Linechart from './Linechart';

const Dashbaord = () => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const [input, setInput] = useState('India');
    const [countryData, setCountryData] = useState(null);
    const [filteredData, setFilteredData] = useState({ cases: {}, deaths: {}, recovered: {} });
    const [countries, setCountries] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [covidData, setCovidData] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                setCountries(
                    response.data.map((country) => ({
                        name: country.name.common,
                        code: country.cca2.toLowerCase(),
                    }))
                );
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, []);

    const fetchData = async (country) => {
        try {
            const response = await axios.get(
                `https://disease.sh/v3/covid-19/historical/${country}?lastdays=1500`
            );
            setCountryData(response.data.timeline);
            setFilteredData(response.data.timeline); // Initially set filtered data to full data
            console.log('Selected Country Data:', response.data);

            const labels = Object.keys(response.data.timeline.cases);
            setCovidData({
                labels,
                datasets: [
                    {
                        label: 'Total Cases',
                        data: Object.values(response.data.timeline.cases),
                        borderColor: '#4f46e5',
                        fill: false,
                    },
                    {
                        label: 'Recoveries',
                        data: Object.values(response.data.timeline.recovered),
                        borderColor: 'green',
                        fill: false,
                    },
                    {
                        label: 'Deaths',
                        data: Object.values(response.data.timeline.deaths),
                        borderColor: 'red',
                        fill: false,
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const filterDataByDateRange = () => {
        if (!startDate || !endDate || !countryData) return;

        const filteredCases = Object.keys(countryData.cases)
            .filter(date => new Date(date) >= startDate && new Date(date) <= endDate)
            .reduce((obj, date) => {
                obj[date] = countryData.cases[date];
                return obj;
            }, {});

        const filteredDeaths = Object.keys(countryData.deaths)
            .filter(date => new Date(date) >= startDate && new Date(date) <= endDate)
            .reduce((obj, date) => {
                obj[date] = countryData.deaths[date];
                return obj;
            }, {});

        const filteredRecoveries = Object.keys(countryData.recovered)
            .filter(date => new Date(date) >= startDate && new Date(date) <= endDate)
            .reduce((obj, date) => {
                obj[date] = countryData.recovered[date];
                return obj;
            }, {});

        setFilteredData({
            cases: filteredCases,
            deaths: filteredDeaths,
            recovered: filteredRecoveries,
        });
    };

    useEffect(() => {
        filterDataByDateRange();
    }, [startDate, endDate, countryData]);

    const handleChange = (value) => {
        setInput(value);
        setShowDropdown(true);
    };

    const handleDropdownClick = (country) => {
        setInput(country.name);
        setShowDropdown(false);
        fetchData(country.code);
    };

    const totalCases = Object.values(filteredData.cases || {}).reduce((total, value) => total + value, 0);
    const totalDeaths = Object.values(filteredData.deaths || {}).reduce((total, value) => total + value, 0);
    const totalRecoveries = Object.values(filteredData.recovered || {}).reduce((total, value) => total + value, 0);

    return (
    <>
            <div className="container mt-5">
                <h2 className="text-center">COVID-19 and Population Dashboard</h2>

                <div className="row mt-4">
                    <div className="col-md-8 text-center">
                        <input
                            type="text"
                            className="form-control mb-3 d-inline-block w-40 mt-4 p-3"
                            style={{ borderRadius: '30px' }}
                            placeholder="Search Country"
                            value={input}
                            onChange={(e) => handleChange(e.target.value)}
                            onFocus={() => setShowDropdown(true)}
                            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                        />

                        {showDropdown && (
                            <div className="dropdown-menu show" style={{ display: 'block' }}>
                                {countries
                                    .filter((country) =>
                                        country.name.toLowerCase().includes(input.toLowerCase())
                                    )
                                    .map((country) => (
                                        <div
                                            key={country.code}
                                            className="dropdown-item"
                                            onClick={() => handleDropdownClick(country)}
                                        >
                                            {country.name}
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                    <div className="col-md-4 text-center mt-4">
                        <DatePicker
                            id="datepicker"
                            placeholderText="date"
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => {
                                setDateRange(update);
                            }}
                            isClearable={true}
                        />
                    </div>
                </div>

                <div className="row text-center mt-4">
                    <div className="col-md-4">
                        <div className="info-card d-flex align-items-center">
                            <div className="info-title flex-grow-1">
                                <h5>Total Cases</h5>
                                <small>0.002%</small>
                            </div>
                            <div className="info-value">
                                <h5>{totalCases.toLocaleString()}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="info-card d-flex align-items-center" style={{ backgroundColor: 'green' }}>
                            <div className="info-title flex-grow-1" style={{ backgroundColor: 'green' }}>
                                <h5>Recoveries</h5>
                                <small>0.002%</small>
                            </div>
                            <div className="info-value">
                                <h5>{totalRecoveries.toLocaleString()}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="info-card d-flex align-items-center" style={{ backgroundColor: 'red' }}>
                            <div className="info-title flex-grow-1" style={{ backgroundColor: 'red' }}>
                                <h5>Deaths</h5>
                                <small>0.002%</small>
                            </div>
                            <div className="info-value">
                                <h5>{totalDeaths.toLocaleString()}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-4' id='chart'>
                    <div className="col-md-6">
                        <div className="">
                            <Linechart data={covidData} />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="">
                            <Piechart data={{ totalCases, totalRecoveries, totalDeaths }} />
                        </div>
                    </div>
                </div>
                </div>
            </>
            );
};

            export default Dashbaord;

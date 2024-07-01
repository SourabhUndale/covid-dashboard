# COVID-19 and Population Dashboard

This project is a web application dashboard that displays COVID-19 data for different countries. Users can select a country, choose a date range, and view the total cases, recoveries, and deaths in the selected date range. The data is visualized using line and pie charts.

Features
* Search for a country to view its COVID-19 data
* Select a date range to filter the data
* View total cases, recoveries, and deaths
* Visualize data using line and pie charts

  
Tech Stack

* React
* Axios
* react-datepicker
* Chart.js
* react-chartjs-2
* Bootstrap (for styling)

Getting Started

Prerequisites
* Node.js and npm installed on your machine
  
Installation
1. Clone the repository:
    git clone https://github.com/your-username/covid-dashboard.git
   
2. Navigate to the project directory:
   cd covid-dashboard
   
3.Install the dependencies:
  npm install

Running the Application
To run the application locally:

bash or powershell
Copy code
* npm start
The application will start on http://localhost:3000.


Project Structure
* src/
  * components/
       * Dashboard.js: Main component that contains the dashboard logic and layout
       * Linechart.js: Component for displaying the line chart
       * Piechart.js: Component for displaying the pie chart
  * App.js: Root component that renders the Dashboard
  * index.css:

Code Overview

Dashboard.js
  * Handles fetching country data, filtering data by date range, and rendering the main dashboard UI.

Linechart.js
  * A component that takes timeline data as a prop and renders a line chart using react-chartjs-2.

Piechart.js
  * A component that takes data (total cases, recoveries, deaths) as a prop and renders a pie chart using react-chartjs-2.

API Usage
The application uses two APIs:

REST Countries API

* Endpoint: https://restcountries.com/v3.1/all
Used to fetch the list of countries and 

* Endpoint: https://disease.sh/v3/covid-19/historical/{country}?lastdays=1500
Used to fetch historical COVID-19 data for a specific country

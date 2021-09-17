import numeral from 'numeral';
import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';

const options = {
    plugins: {
        legend: false,
        tooltip: {
            mode: "index",
            intersect: false,
            callbacks: {
                label: function (tooltipItem) {
                    return numeral(tooltipItem.formattedValue).format("+0,0");
                },
            },
        },
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    scales: {
        yAxis: {
            grid: {
                display: false,
            },
            ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, values) {
                    return numeral(value).format("0a");
                },
            },
        },
        
    },
};

const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;

    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};

const LineGraph = ({ casesType = "cases" }) => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let chartData = buildChartData(data, casesType);
                    setData(chartData);
                    console.log(chartData);
                });
        };

        fetchData();
    }, [casesType]);

    return (
        <div>
            {data?.length > 0 && (
            <Line
                data={{
                    datasets: [
                    {
                        backgroundColor: "rgba(204, 16, 52, 0.5)",
                        borderColor: "#CC1034",
                        data: data,
                    },
                    ],
                }}
                options={options}
            />
        )}
            
        </div>
    )
}

export default LineGraph

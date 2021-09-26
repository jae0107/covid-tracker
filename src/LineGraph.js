import numeral from 'numeral';
import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';

let line_colour;

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

    if (casesType === "cases") {
        line_colour = "#CC1034";

    } else if (casesType === "recovered") {
        line_colour = "#7dd71d";

    } else if (casesType === "deaths") {
        line_colour = "black";
    }

    for (let date in data.cases) {
        if (lastDataPoint) {
            let yValue = data[casesType][date] - lastDataPoint;

            if(yValue < 0) {
                yValue = 0;
            }
            let newDataPoint = {
                x: date,
                y: yValue,
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};

const LineGraph = ({ casesType, ...props }) => {
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
                });
        };

        fetchData();
    }, [casesType]);

    return (
        <div className={props.className}>
            {data?.length > 0 && (
            <Line
                data={{
                    datasets: [
                    {
                        backgroundColor: line_colour,
                        borderColor: line_colour,
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

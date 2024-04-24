import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = () => {
  const [chartData] = useState({
    series: [
      {
        data: [
          // Your data here
          {
            x: "January",
            y: [6629.81, 6650.5, 6623.04, 6633.33],
          },
          {
            x: "February",
            y: [6632.01, 6643.59, 6620, 6630.11],
          },
          {
            x: "March",
            y: [6630.71, 6648.95, 6623.34, 6635.65],
          },
          {
            x: "April",
            y: [6635.65, 6651, 6629.67, 6638.24],
          },
          {
            x: "May",
            y: [6638.24, 6640, 6620, 6624.47],
          },
          {
            x: "June",
            y: [6624.53, 6636.03, 6621.68, 6624.31],
          },
          {
            x: "July",
            y: [6624.61, 6632.2, 6617, 6626.02],
          },
          {
            x: "August",
            y: [6627, 6627.62, 6584.22, 6603.02],
          },
          {
            x: "September",
            y: [6605, 6608.03, 6598.95, 6604.01],
          },
          {
            x: "October",
            y: [6604.5, 6614.4, 6602.26, 6608.02],
          },
          {
            x: "November",
            y: [6608.02, 6610.68, 6601.99, 6608.91],
          },
          {
            x: "December",
            y: [6608.91, 6618.99, 6608.01, 6612],
          },
        ],
      },
    ],
    options: {
      chart: {
        type: "candlestick",
        height: 350,
      },
      fill: {
        colors: ["#F44336", "#E91E63", "#9C27B0"],
      },
      xaxis: {
        type: "category", // Change type to category for categorical data
        categories: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ], // Provide all months here
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
      toolbar: {
        show: true,
      },
    },
  });

  return (
    <div>
      <div
        id="chart"
        className="p-5 rounded-3xl flex flex-col border shadow-lg shadow-grey-500/40 h-[24rem]"
      >
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="candlestick"
          height={350}
        />
      </div>
    </div>
  );
};

export default ApexChart;

import React from "react";
import { Chart } from "react-google-charts";

const data = [
  ["Year", "Sales", "Expenses"],
  ["2021", 1000, 400],
  ["2022", 1170, 460],
  ["2023", 660, 1120],
  ["2024", 1030, 540],
];

const options = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales and Expenses over the Years",
  },
  colors: ["rgb(53, 138, 148)", "rgb(37, 11, 165)", "#188310"],
};

const BarChart = () => {
  return <Chart chartType="Bar" width="100%" height="350px" data={data} options={options} />;
};

export default BarChart;

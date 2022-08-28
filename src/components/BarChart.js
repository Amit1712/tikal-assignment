import { useEffect, useState } from "react";
import { CHART_INFO_JSON, API_BASE_URL } from "../assets/constants";
import axios from "axios";

import "../assets/barChart.css";

const BarChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const getChartData = async () => {
      try {
        const response = await axios.get(API_BASE_URL + "/character/1,2,3,4,5");
        if (response.status === 200) {
          setChartData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getChartData();
  }, []);

  useEffect(() => {
    const buildChart = () => {
      if (chartData.length) {
        const chart = document.createElement("div");
        //create the chart canvas
        const barchart = document.createElement("table");

        //create the bar row
        const barrow = document.createElement(CHART_INFO_JSON.trow);

        //lets add data to the chart
        for (let i = 0; i < chartData.length; i++) {
          barrow.setAttribute("class", "bars");
          const prefix = CHART_INFO_JSON.prefix || "";
          //create the bar data
          const bardata = document.createElement(CHART_INFO_JSON.td);
          const bar = document.createElement("div");
          bar.style.background = CHART_INFO_JSON.colors[i];
          bar.style.height = chartData[i][CHART_INFO_JSON.ykey].length + prefix;
          bardata.innerText = chartData[i][CHART_INFO_JSON.ykey].length;
          bardata.appendChild(bar);
          barrow.appendChild(bardata);
        }

        //create legends
        const legendrow = document.createElement(CHART_INFO_JSON.trow);
        const legend = document.createElement(CHART_INFO_JSON.td);
        legend.setAttribute("class", "legend");
        legend.setAttribute("colspan", chartData.length);

        //add legend data
        for (let i = 0; i < chartData.length; i++) {
          const legbox = document.createElement("span");
          legbox.setAttribute("class", "legbox");
          const barname = document.createElement("span");
          barname.setAttribute("class", "xaxisname");
          barname.style.background = CHART_INFO_JSON.colors[i];
          const bartext = document.createElement("span");
          bartext.innerText = chartData[i][CHART_INFO_JSON.xkey];
          legbox.appendChild(barname);
          legbox.appendChild(bartext);
          legend.appendChild(legbox);
        }
        barrow.appendChild(legend);
        barchart.appendChild(barrow);
        barchart.appendChild(legendrow);
        chart.appendChild(barchart);
        document.getElementById("chart").innerHTML = chart.outerHTML;
      }
    };

    buildChart();
  }, [chartData]);

  return <div id="chart"></div>;
};

export default BarChart;

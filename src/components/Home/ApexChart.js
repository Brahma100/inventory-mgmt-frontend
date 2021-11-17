import Chart from "react-apexcharts";
import React from "react";
import "./ApexChart.css";

export default class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
   
      
     
      series: [
        {
          name: "",
          data: [10,100,0, 50, 70, 200, 120,50,110, 400,10]
        }
      ],
      options: {
        fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.9,
              opacityTo: 0.5,
              stops: [0, 99, 100]
            }
          },
        chart: {
          zoom: {
            enabled: false,
            type: 'x',  
            autoScaleYaxis: false,  
            zoomedArea: {
              fill: {
                color: '#90CAF9',
                opacity: 0.4
              },
              stroke: {
                color: '#0D47A1',
                opacity: 0.4,
                width: 1
              }
            }
        },
          height: 350,
          type: "area",
          background:"none",
          gridline:"none",
        },
        dataLabels: {

          display:'none',
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
      }
    };
  }

  render() {
    return (
      <div id="chart">
        <Chart
        grid={this.state.grid}
          options={this.state.options}
          series={this.state.series}
          type="area"
          height={350}
        />
      </div>
    );
  }
}


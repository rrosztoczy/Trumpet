import React, { Component } from 'react'
import Chart from "chart.js";

export default class TrumpetDoughnut extends Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        const trumpetData = this.props.trumpets
        const trumpetType = trumpetData.map(trumpet => trumpet.trumpet_type)
        const labels = [... new Set(trumpetType)]
        let counts = {};
        trumpetType.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
        const chartData = labels.map(label => counts[label])
        const prettyColors = ["rgb(255, 99, 131)", "rgb(55, 162, 235)", "rgb(255, 205, 86)", "#FF9026", "#4BC1C0"]
        
        new Chart(myChartRef, {
            type: "doughnut",
            data: {
                //Bring in data
                labels: labels,
                datasets: [
                    {
                        label: labels,
                        data: chartData,
                        backgroundColor: prettyColors ,
                        borderColor: prettyColors 
                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });
    }
    render() {
        return (
            <div>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}
import React, { Component } from 'react'
import Chart from "chart.js";

export default class TrumpetDoughnut extends Component {
    chartRef = React.createRef();



    renderChart () {
        const myChartRef = this.chartRef.current.getContext("2d");
        const trumpetData = this.props.trumpets
        console.log("mounted! trumpets:", trumpetData)
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


    shouldComponentUpdate(nextProps) {
        const oldIds = this.props.trumpets.map(trumpet => trumpet.id)
        const newIds = nextProps.trumpets.map(trumpet => trumpet.id)
        const is_same = (oldIds.length === newIds.length) && oldIds.every(function(element, index) {
            return element === newIds[index]; 
        });

        const checkTypes = () => {
            nextProps.trumpets.forEach( (newTrumpet) => {
            const oldTrumpet = this.props.trumpets != [] ? this.props.trumpets.find(trumpet => trumpet.id === newTrumpet.id) : {}
            if (oldTrumpet != undefined && oldTrumpet.trumpet_type !== newTrumpet.trumpet_type) {
                return true
            } else {
                return false
            }
            })
            }

        if (is_same === true) {
            checkTypes()
        } else {
            return true
        }
        
    }

    componentDidMount() {
        this.renderChart()
    }

    componentDidUpdate() {
        this.renderChart()
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

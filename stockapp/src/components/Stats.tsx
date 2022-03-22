import React from 'react'
import ReactApexChart from 'react-apexcharts'

const Stats = ({volume}:{volume:any}) => {

  
  var options = {
        
    series: [{//I have to send last 7 days data: date(day + date) and volume
      data: volume
    }],
    options: {
      chart: {
        type: 'bar',
        events: {
        }
      },
      colors: "blue",
      plotOptions: {
        bar: {
          columnWidth: '',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        labels: {
          style: {
            colors: "blue",
            fontSize: '12px'
          }
        }
      }
    },
  };
 
  return (
    <div className = "stats">
      <h6 style = {{marginLeft: "30%"}}>Volume(last 7 days)</h6>
      <ReactApexChart options={options} series={options.series} width = {window.innerWidth * 35 / 100} height = {window.innerHeight * 25 / 100} type="bar" className = "bar__chart"/>
    </div>
  )
}

export default Stats
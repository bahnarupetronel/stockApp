import ApexChart from 'react-apexcharts'
import '../stylesheets/charts.css'
import Recomandations from './Recomandations';
import Stats from './Stats';
import {useState} from 'react'

const Chart = ({myData, volume, recommendedSymbols, setRange, setInterval, fetchData, margin}:{myData: any, volume:Array<string>, recommendedSymbols:any, setRange:any, setInterval:any, fetchData:any, margin:number}) => {
    const volumeData = volume.slice(-7);
    console.log(volumeData)
    console.log(myData)

    const myChart = {
        options: {
          chart: {
            type: 'candlestick',
          },
          title: {
            text: 'CandleStick Chart',
            align: 'center'
          },
          xaxis: {
            type: 'datetime'
          },
          yaxis: {
            tooltip: {
              enabled: false
            }
          }
        },
        series: myData,

        colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800']
    }

    const[reminder, setReminder] = useState(false)

    const onChange = (event:any) => {
      console.log(event.currentTarget.checked)
      setReminder(event.currentTarget.checked)
      console.log(margin)
      //fetchData()
    }

    const changeRange = (event:any) => {
      console.log(event.currentTarget.value)
      setRange(event.currentTarget.value)
      fetchData()
    }

    const changeInterval= (event:any) => {
      console.log(event.currentTarget.value)
      setInterval(event.currentTarget.value)
      fetchData()
    }

    return (
      <div className = "chart"> 
          <Recomandations  recommendedSymbols = {recommendedSymbols}/>
          <Stats volume = {volumeData}/>
          <div className = "apex__chart">
            <div className='chart__filter'>
              <label className = "average">Average</label>
              <input type = 'checkbox'  checked = {reminder} id = "average" 
                onChange = {(e) => onChange(e)}></input>
              
              <label className = "range">Range</label>
              <select id="range"
                      onChange = {(e) => changeRange(e)}>
                <option label="1d">1d</option>
                <option label="5d">5d</option>
                <option label="1mo">1mo</option>
                <option label="3mo">3mo</option>
                <option label="6mo">6mo</option>
                <option label="1y">1y</option>
                <option label="5y">5y</option>
                <option label="max">max</option>
              </select>

              <label className = "inteval">Interval</label>
              <select id="interval"
                      onChange = {(e) => changeInterval(e)}>
                <option label="1m">1m</option>
                <option label="5m">5m</option>
                <option label="15m">15m</option>
                <option label="1d">1d</option>
                <option label="1wk">1wk</option>
                <option label="1mo">1mo</option>
              </select>
            </div> 
            <div className="average__line" style={{marginTop: `${margin + 8}vh`, visibility: reminder ? 'visible' : 'hidden' }} >
              <h5>Average</h5>
              <hr/>
            </div>
            <ApexChart options={myChart} series={myChart.series} type="candlestick" 
            width = {window.innerWidth > 600 ? window.innerWidth * 58 / 100 : window.innerWidth * 90 / 100} height= "420" />
          </div> 
      </div>
    )      
}
//marginTop: `${margin*2}%`,
export default Chart; 
import React from 'react';
import {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SearchBar from './components/searchBar'
import Chart from './components/Chart'
import Footer from './components/Footer'
import {fetchCompanyData, fetchCompanyName} from "./components/Requests";
import {calculateAverage, calculateMargin, calculateVolume} from "./components/Util";

function App() {
  const [companyName, setCompanyName] = useState('')
  const [companyData, setCompanyData] = useState([{
      data: []
    }]);
  const [symbol, setSymbol] = useState('AAPL')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [interval, setInterval] = useState('1d')
  const [range, setRange] = useState('6mo')
  const [volume, setVolume] = useState([])
  const [average, setAverage] = useState(0)
  const [margin, setMargin] = useState(0)
  const [dataIsLoaded, setDataIsLoaded] = useState(false)

  //by default, the site will show Apple data
  useEffect(() => {
    fetchCompanyData(symbol, interval, range).then(function (response) {
       console.log(response);
        console.log("interval is " + interval)
        console.log("range is " + range)
       const myData = response.chart.result[0];
        //console.log(myData)
       //getting the prices
       const prices = myData.timestamp.map((timestamp:number, index:number) => ({
           x: new Date(timestamp * 1000).toLocaleString('en-US').split(',')[0],
           y: [myData.indicators.quote[0].open[index], myData.indicators.quote[0].high[index], myData.indicators.quote[0].low[index], myData.indicators.quote[0].close[index]]
       }));
        console.log("prices")
        console.log(prices)
       setCompanyData([{
           data:prices,
       }]);
       //console.log(prices)

      //set average price
        setAverage(calculateAverage(myData, prices));

       //set top margin for average line
        setMargin(calculateMargin(myData, prices, average));

      //set volume for the last 7 trading days
        setVolume(calculateVolume(myData))
    })
  }, [symbol, range, interval, dataIsLoaded])

  const handleClick = ():void => {

    fetchCompanyName(companyName).then(function (response) {
        //console.log('handle click')
        //console.log(companyName)
       //console.log(response.ResultSet.Result[0].symbol);
       setSymbol(response.ResultSet.Result[0].symbol)
       setCompanyName(response.ResultSet.Result[0].name.split(' ')[0])
       setDataIsLoaded(true)
    })

    //fetchCompanyData();
  }

  const handleBlur = (name:string):void => {
    console.log(name)
    setCompanyName(name)
  }
  
  return (
    <div className='myApp'>
       <SearchBar handleBlur ={handleBlur} handleClick = {handleClick}/>
       <Chart myData = {companyData} volume = {volume} symbol = {symbol} setRange = {setRange} setInterval = {setInterval} dataIsLoaded = {dataIsLoaded} setSymbol = {setSymbol}  interval = {interval} range = {range}/>
       <Footer setStartDate = {setStartDate} setEndDate = {setEndDate}/>
    </div>
  );
}

export default App;
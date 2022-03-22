import React from 'react';
import {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SearchBar from './components/searchBar'
import Chart from './components/Chart'
import Footer from './components/Footer'

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
  const [recommendedSymbols, setRecommendedSymbols] = useState([])
  const [margin, setMargin] = useState(0)
  
  const printData = ():void => {
    console.log(companyName)
    console.log(symbol)
    console.log(companyData)
    console.log(volume)
  }

  function abbreviateNumber(value:number) {
    let newValue:any = value;
    const suffixes = ["", "K", "M"];
    let suffixNum = 0;
    while (newValue >= 1000 && suffixNum < 3) {
      newValue /= 1000;
      suffixNum++;
    }
  
    newValue = newValue.toPrecision(3);
  
    newValue += suffixes[suffixNum];
    return newValue;
 }

  //I'm searching the name and the symbol using the text introduced
  //If I get no response, the text might be the symbol and this search doesn't affect me
  const fetchCompanyName = async() => {
    var axios = require("axios").default;
    var options = {
      method: 'GET',
      url: `https://yfapi.net/v6/finance/autocomplete?region=US&lang=en&query=${companyName}`,
      params: {modules: 'defaultKeyStatistics,assetProfile'},
      headers: {
        'x-api-key': 'OmFnDkbvfW7KeMAfc5I2d8IYYDT26XmQ8ToLD6la'
      }
    };
    //ResultSet.Result[0]
    await axios.request(options).then(function (response:any) {
      //console.log(response.data.ResultSet.Result[0].symbol);
      setSymbol(response.data.ResultSet.Result[0].symbol)
      setCompanyName(response.data.ResultSet.Result[0].name.split(' ')[0])
     // setCompanyData(response.data)
    }).catch(function (error:any) {
      console.error(error);
    });
  }

  /**
 const fetchRecommendations = async() => {
  var axios = require("axios").default;
    var options = {
      method: 'GET',

      url: `https://yfapi.net/v6/finance/recommendationsbysymbol/${symbol}`,
      params: {modules: 'defaultKeyStatistics,assetProfile'},
      headers: {
        'x-api-key': 'OmFnDkbvfW7KeMAfc5I2d8IYYDT26XmQ8ToLD6la'
      }
     };

    await axios.request(options).then(function (response:any) {
      console.log("---------------" + response.data.finance.result[0].recommendedSymbols)//finance.result[0].recommendedSymbols[0]
      console.log(response.data.finance.result[0].recommendedSymbols)
      setRecommendedSymbols(response.data.finance.result[0].recommendedSymbols)
    }).catch(function (error:any) {
      console.error(error);
    });
}*/

  //fetching company's data
  const fetchCompanyData = async() =>  {
    var axios = require("axios").default;
    var options = {
      //url: `https://yfapi.net/v8/finance/chart/${companySymbol}?range=${range}&region=US&interval=${timeStamp}&lang=en&events=div%2Csplit`,

      url: `https://yfapi.net/v8/finance/chart/${symbol}?range=${range}&region=US&interval=${interval}&lang=en&events=div%2Csplit`,
      params: {modules: 'defaultKeyStatistics,assetProfile'},
      headers: {
        'x-api-key': 'OmFnDkbvfW7KeMAfc5I2d8IYYDT26XmQ8ToLD6la'
      }
    };

    await axios.request(options).then(function (response:any) {
      //console.log(response.data);
      const myData = response.data.chart.result[0];
     // console.log(myData)
      //getting the prices
      const prices = myData.timestamp.map((timestamp:number, index:number) => ({
          x: new Date(timestamp * 1000).toLocaleString('en-US').split(',')[0],
          y: [myData.indicators.quote[0].open[index], myData.indicators.quote[0].high[index], myData.indicators.quote[0].low[index], myData.indicators.quote[0].close[index]]
      }));
      setCompanyData([{
        data:prices,
      }]);
      //console.log(prices)
      
      //make average
      let average:number = 0;

      var iterator = myData.indicators.quote[0].close.values();
      var maxim = 0;
      for (let element of iterator) {
        average += element;
      }

      iterator = myData.indicators.quote[0].high.values();
      for (let element of iterator) {
        if(element > maxim)
          maxim = element;
      }

      //console.log(average / (prices.length - 1))
      setAverage(average / (prices.length - 1));
        
      //Here I calculate the difference between the maxim and the average        
      let diff:number = 1 - average / (prices.length - 1) / maxim;
        
      let margin = diff * 100;
      //console.log(margin)
      setMargin(margin)
        
      //getting the volume
      const volume = myData.indicators.quote[0].volume.map((volume:number) => 
        abbreviateNumber(volume));
      setVolume(volume.slice(-7));
      //console.log(volume);
          
    }).catch(function (error:any) {
      console.error(error);
    });
  }

  //by default, the site will show Apple data
  useEffect(() => {
    //fetchRecommendations();
    fetchCompanyData();
  }, [symbol, range, interval])

  const handleClick = ():void => {
    console.log(companyName)
    fetchCompanyName();
    //fetchCompanyData();
  }

  const handleChange = (name:string):void => {
    console.log(name)
    setCompanyName(name)
  }
  
  return (
    <div className='myApp'>
       <SearchBar handleChange ={handleChange} handleClick = {handleClick}  onClick ={printData}/>
       <Chart myData = {companyData} volume = {volume} recommendedSymbols = {recommendedSymbols} setRange = {setRange} setInterval = {setInterval} fetchData = {fetchCompanyData} margin = {margin}/>
       <Footer setStartDate = {setStartDate} setEndDate = {setEndDate}/>
    </div>
  );
}

export default App;
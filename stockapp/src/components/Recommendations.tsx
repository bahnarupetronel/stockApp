import React, {useEffect, useState} from 'react'
import '../stylesheets/charts.css'
import Stock from './Stock'
import {fetchRecommendations} from "./Requests";

const Recommendations = ({symbol, dataIsLoaded, setSymbol, interval, range}:{symbol:string, dataIsLoaded:boolean, setSymbol:any, interval:any, range:any}) => {
    const [recommendedSymbols, setRecommendedSymbols] = useState<any[]>([])
    //by default, the site will show Apple data
    useEffect(() => {

      fetchRecommendations(symbol).then(function (response) {
          console.log(response.finance.result[0].recommendedSymbols[0].symbol)
          setRecommendedSymbols(response.finance.result[0].recommendedSymbols)
          //console.log(recommendedSymbols[0].symbol)// finance.result[0].recommendedSymbols
      })
    }, [symbol, dataIsLoaded])

  if (typeof(recommendedSymbols[0]) != "undefined")
  return (
    <div className = "recommendations">
        <h5 className = 'h5__daily'>Recommendations</h5>
        <Stock symbol = {recommendedSymbols[0].symbol} setSymbol = {setSymbol} interval = {interval} range = {range}/>
        <Stock symbol = {recommendedSymbols[1].symbol} setSymbol = {setSymbol} interval = {interval} range = {range}/>
        <Stock symbol = {recommendedSymbols[2].symbol} setSymbol = {setSymbol} interval = {interval} range = {range}/>
        <Stock symbol = {recommendedSymbols[3].symbol} setSymbol = {setSymbol} interval = {interval} range = {range}/>
      </div>
  )
    else
      return ( //[0].symbol
          <div className = "recommendations">
              <h5 className = 'h5__daily'>Recommendations</h5>
              <Stock symbol = {" "} setSymbol = {setSymbol} interval = {interval} range = {range}/>
              <Stock symbol = {" "} setSymbol = {setSymbol}  interval = {interval} range = {range}/>
              <Stock symbol = {" "} setSymbol = {setSymbol}  interval = {interval} range = {range}/>
              <Stock symbol = {" "} setSymbol = {setSymbol}  interval = {interval} range = {range}/>
          </div>
      )
}

export default Recommendations
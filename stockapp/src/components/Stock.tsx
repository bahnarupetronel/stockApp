import React, {useEffect} from 'react'
import '../stylesheets/charts.css'
import {fetchCompanyData} from "../components/Requests";

const Stock = ({symbol, setSymbol, interval, range}:{symbol:string, setSymbol:any, interval:any, range:any}) => {
    const handleClick = (symbol:string) => {
        setSymbol(symbol);
        console.log(symbol);
    }

    useEffect(() =>  {
        fetchCompanyData(symbol, interval, range).then(function (response) {
            //const myData = response.chart.result[0].indicators.quote[0].open[index];
            //const myData = response.chart.result[0].indicators.quote[0].open[index];
        })
    })
  return (

          <div className = "stock">
              <button
                  type="button"
                  className = "btn__stock"
                  onClick = {() => handleClick}
              >
                  <h5>{symbol}</h5>
                  <h6>price</h6>
              </button>
          </div>

  )
}

export default Stock
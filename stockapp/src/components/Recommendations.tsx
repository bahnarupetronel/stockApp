import React from 'react'
import '../stylesheets/charts.css'
import Stock from './Stock'
import PropTypes from 'prop-types';

const Recommendations = ({recommendedSymbols}:{recommendedSymbols:any}) => {
  //console.log("---------------" )//finance.result[0].recommendedSymbols[0]
  //if(recommendedSymbols !== "undefined") console.log(recommendedSymbols[0])
  return ( //[0].symbol
    <div className = "recomandations">
        <h5 className = 'h5__daily'>Recomandations</h5>  
          <Stock symbol = "AMZN"/>
          <Stock symbol = "PLTR"/>
          <Stock symbol = "GME"/>
          <Stock symbol = "GOOG"/>
      </div>
  )
}
/**
 * <Stock symbol = {recommendedSymbols[0].symbol}/>
        <Stock symbol = {recommendedSymbols[1].symbol}/>
        <Stock symbol = {recommendedSymbols[2].symbol}/>
        <Stock symbol = {recommendedSymbols[3].symbol}/>
 */

export default Recommendations
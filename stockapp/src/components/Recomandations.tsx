import React from 'react'
import '../stylesheets/charts.css'
import Stock from './Stock'
const Recomandations = ({recommendedSymbols}:{recommendedSymbols:any}) => {
  console.log(recommendedSymbols[0])
  return ( //[0].symbol
    <div className = "recomandations">
        <h5 className = 'h5__daily'>Recomandations</h5>  
        
    </div>
  )
}
/**
 * <Stock symbol = {recommendedSymbols[0].symbol}/>
        <Stock symbol = {recommendedSymbols[1].symbol}/>
        <Stock symbol = {recommendedSymbols[2].symbol}/>
        <Stock symbol = {recommendedSymbols[3].symbol}/>
 */
export default Recomandations
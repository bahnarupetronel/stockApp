import React from 'react'
import '../stylesheets/charts.css'

const Stock = ({symbol}:{symbol:string}) => {
  return (
    <div className = "stock">
        <h5>{symbol}</h5>
    </div>
  )
}

export default Stock
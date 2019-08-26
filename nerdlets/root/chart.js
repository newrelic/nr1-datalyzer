import React from "react"
import {LineChart} from 'nr1'

import getMetricQuery  from "./get-query";

export default class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ChartType: LineChart,
      timeseries: true
    }
  }

  render() {
    if(!this.props.metricName) return <div/>
    const query = getMetricQuery(this.props, this.state)
    const {ChartType} = this.state

    console.log(this.props.account, query)
    return <div style={{width: "100%", height: "300px"}}>
      <ChartType accountId={this.props.account.id} query={query}/>
    </div>

    
  }
}
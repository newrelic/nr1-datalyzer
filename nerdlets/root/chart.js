import React from "react"
import {LineChart, Button, navigation} from 'nr1'

import getMetricQuery  from "./get-query";

function openChartBuilder(query) {
  const nerdlet = {
    id: 'wanda-data-exploration.nrql-editor',
    urlState: {
      nrql: query
    }
  }
  navigation.openOverlay(nerdlet)
}

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

    return <div style={{width: "100%", height: "300px"}}>
      <ChartType accountId={this.props.account.id} query={query}/>
      <Button onClick={() => openChartBuilder(query)}>Show Query</Button>
    </div>

    
  }
}
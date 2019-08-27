import React from "react"
import {LineChart, Button, navigation} from 'nr1'

import getQuery  from "./get-query";

function openChartBuilder(query, account) {
  const nerdlet = {
    id: 'wanda-data-exploration.nrql-editor',
    urlState: {
      initialActiveInterface: 'nrqlEditor',
      initialAccountId: account.id,
      initialNrqlValue: query,
      isViewingQuery: true,
    }
  }
  navigation.openOverlay(nerdlet)
}

function Nrql({query, account}) {
  return <div className="nrql-query-container" onClick={() => openChartBuilder(query, account)}>
    <h4 className="nrql-query-header">NRQL</h4>
    <div className="nrql-query" >
      {query}
    </div>
  </div>
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
    const query = getQuery(this.props, this.state)
    const {ChartType} = this.state

    return <div style={{width: "100%"}} className="primary-chart-container">
      <Nrql query={query} account={this.props.account}/>
      <ChartType className="primary-chart" accountId={this.props.account.id} query={query} style={{height: "300px"}}/>
    </div>

    
  }
}
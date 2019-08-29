import React from "react"
import {LineChart, AreaChart, BarChart, PieChart, 
  Radio, Stack, StackItem, navigation} from 'nr1'

const CHART_TYPES = [
  {ChartType: LineChart, timeseries: true, title: "Line"},
  {ChartType: AreaChart, timeseries: true, title: "Area"},
  {ChartType: BarChart, timeseries: false, title: "Bar"},
  {ChartType: PieChart, timeseries: false, title: "Pie"},
]

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

class ChartPicker extends React.Component {
  render() {
    const {chart, setChartType} = this.props
    return <Stack distributionType="trailing" className="chart-picker">
      {CHART_TYPES.map(chartType => {
        return <StackItem key={chartType.title}>
          <Radio 
            label={chartType.title}
            checked={chartType == chart}
            onClick={() => {setChartType(chartType)}}/>
        </StackItem>
      })}
    </Stack>
  }
}
export default class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chart: CHART_TYPES[0],
      timeseries: true
    }
  }

  setChartType(chart) {
    this.setState({chart})
  }

  render() {
    if(!this.props.attribute) return <div/>
    const {chart} = this.state
    const {ChartType} = chart
    const query = getQuery(this.props, {timeseries: chart.timeseries})

    return <div style={{width: "100%"}} className="primary-chart-container">
      <Nrql query={query} account={this.props.account}/>
      <ChartPicker chart={chart} setChartType={(chart) => this.setState({chart})}/>
      <ChartType className="primary-chart" accountId={this.props.account.id} query={query} style={{height: "300px"}}/>
    </div>

    
  }
}
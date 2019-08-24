import React from "react"
import { Stack, StackItem, Grid, GridItem } from 'nr1'

import MetricPicker from './metric-picker'
import DimensionPicker from './dimension-picker'
import FunctionPicker from './function-picker'
import Chart from './chart'
import FacetTable from './facet-table'
import Filters from './filters'
import {getFilterWhere} from './get-metric-query'

function Debug({ title }) {
  const style = {
    background: "#ffeeee",
    border: "red solid 1px",
    padding: "8px"
  }
  return <div style={style}>
    {title}
  </div>
}


export default class MetricAnalyzer extends React.Component {
  constructor(props) {
    super(props)

    this._setMetricName = this._setMetricName.bind(this)
    this._setDimension = this._setDimension.bind(this)
    this._setFunction = this._setFunction.bind(this)
    this._setFilter = this._setFilter.bind(this)
    this._removeFilter = this._removeFilter.bind(this)

    this.state ={ fn: 'average', filters: {}, filterWhere: null }
  }

  onStateChange(prevProps) {
    if(prevProps.account.id != this.props.account.id) {
      this.setState({dimension: null, filters: {}, metricName: null})
    }
  }

  _setMetricName(metricName) {
    this.setState({ metricName, filters: {}, filterWhere: null })
  }

  _setDimension(dimension) {
    this.setState({ dimension })
  }

  _setFunction(fn) {
    this.setState({fn})
  }

  _setFilter(dimension, value) {
    const {filters} = this.state
    filters[dimension] = filters[dimension] || []
    if(!filters[dimension].includes(value)) filters[dimension].push(value)

    const filterWhere = getFilterWhere(filters)
    this.setState({filters, filterWhere})
  }

  _removeFilter(dimension, value) {
    const {filters} = this.state
    filters[dimension] = filters[dimension].select(v => v !== value)

    this.setState({filters})
  }

  render() {
    return <Stack directionType="vertical" alignmentType="fill">
      <StackItem>
        <Stack alignmentType="baseline">
          <StackItem grow>
            <MetricPicker {...this.props} {...this.state} setMetricName={this._setMetricName} />
          </StackItem>
          <StackItem>
            <FunctionPicker {...this.props} {...this.state} setFunction={this._setFunction} />
          </StackItem>
        </Stack>
      </StackItem>
      <StackItem>
        <Filters {...this.props} {...this.state} removeFilter={this._removeFilter} />
      </StackItem>
      <StackItem alignmentType="trailing" fill>
        <Grid>
          <GridItem columnSpan={3}>
            <DimensionPicker {...this.props} {...this.state} setDimension={this._setDimension} />
          </GridItem>
          <GridItem columnSpan={9}>
            <Stack directionType="vertical" alignmentType="fill">
              <StackItem>
                <Chart {...this.props} {...this.state} />
              </StackItem>
              <StackItem>
                <FacetTable {...this.props} {...this.state} setFilter={this._setFilter} />
              </StackItem>
            </Stack>
          </GridItem>
        </Grid>
      </StackItem>
    </Stack>
  }
}
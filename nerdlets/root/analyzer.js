import React from "react"
import { Stack, StackItem, Grid, GridItem } from "nr1"

import DimensionPicker from "./dimension-picker"
import Chart from "./chart"
import FacetTable from "./facet-table"
import Filters from "./filters"
import { getFilterWhere } from "./get-query"
import MetricsHeader from "./metrics/metrics-header"
import EventsHeader from "./events/events-header"

export default class Analyzer extends React.Component {
  constructor(props) {
    super(props)

    this._setAttribute = this._setAttribute.bind(this)
    this._setDimension = this._setDimension.bind(this)
    this._setEventType = this._setEventType.bind(this)
    this._setFunction = this._setFunction.bind(this)
    this._setFilter = this._setFilter.bind(this)
    this._removeFilter = this._removeFilter.bind(this)

    this.state = {
      fn: "average",
      filters: {},
      filterWhere: null,
      eventType: this.props.eventType
    }
  }

  onStateChange(prevProps) {
    if (
      prevProps.account.id != this.props.account.id ||
      prevProps.dataType != this.props.dataType
    ) {
      this.setState({
        dimension: null,
        filters: {},
        attribute: null,
        filters: {},
        filterWhere
      })
    }
  }

  _setAttribute(metricName) {
    this.setState({
      metricName,
      attribute: metricName,
      filters: {},
      filterWhere: null
    })
  }

  _setDimension(dimension) {
    this.setState({ dimension })
  }

  _setEventType(eventType) {
    this.setState({
      eventType,
      attribute: null,
      dataType: "event",
      filters: {},
      filterWhere: null
    })
  }

  _setFunction(fn) {
    this.setState({ fn })
  }

  _setFilter(dimension, value) {
    const { filters } = this.state
    filters[dimension] = filters[dimension] || []
    if (!filters[dimension].includes(value)) filters[dimension].push(value)

    const filterWhere = getFilterWhere(this.state, filters)
    this.setState({ filters, filterWhere, dimension: null })
  }

  _removeFilter(attribute, value) {
    const { filters } = this.state
    filters[attribute] = filters[attribute].filter(v => v !== value)

    // if there are no more values on this attribute, delete the empty array
    if (filters[attribute].length == 0) delete filters[attribute]

    const filterWhere = getFilterWhere(this.state, filters)
    this.setState({ filters, filterWhere, dimension: null })
  }

  render() {
    const {dataType} = this.props
    const Header = dataType == 'metric' ? MetricsHeader : EventsHeader

    return <>
      <Stack directionType="vertical" alignmentType="fill" className="analyzer-stack">
        <StackItem>
          <Header {...this.props} {...this.state} 
            setAttribute={this._setAttribute} setFunction={this._setFunction} setEventType={this._setEventType} />
        </StackItem>
        </Stack>
      <Filters {...this.props} {...this.state} removeFilter={this._removeFilter} />
      <Grid className="primary-body-stack-item-grid">
        <GridItem columnSpan={3} collapseGapAfter className="col-1">
          <DimensionPicker {...this.props} {...this.state} setDimension={this._setDimension} />
        </GridItem>
        <GridItem columnSpan={9} className="primary-chart-grid-item">
              <Chart {...this.props} {...this.state} />
              <FacetTable {...this.props} {...this.state} setFilter={this._setFilter} />
        </GridItem>
      </Grid>
    </>

  }
}

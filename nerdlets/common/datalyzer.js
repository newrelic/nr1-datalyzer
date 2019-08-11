import React from 'react'
import PropTypes from 'prop-types';

import { Stack, StackItem, Grid, GridItem } from 'nr1'

import Chart from './chart'
import EventPicker from './event-picker'
import FacetPicker from './facet-picker'
import FacetTable from './facet-table'

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

export default class Datalyzer extends React.Component {

  constructor(props) {
    super(props)

    this._setPlot = this._setPlot.bind(this)
    this._setFn = this._setFn.bind(this)
    this._setFacet = this._setFacet.bind(this)

    this.state = {}
  }

  _setPlot(plot) {
    this.setState({ plot })
  }

  _setFn(fn) {
    this.setState({ fn })
  }

  _setFacet(facet) {
    this.setState({ facet })
  }

  render() {
    return <Stack directionType="vertical" alignmentType="fill">
      <StackItem>
        <Stack>
          <StackItem>
            <EventPicker {...this.props} {...this.state} />
          </StackItem>
          <StackItem>
            <Debug title="Plot Picker" />
          </StackItem>
          <StackItem>
            <Debug title="Function Picker" />
          </StackItem>
        </Stack>
      </StackItem>
      <StackItem alignmentType="trailing" fill>
        <Grid>
          <GridItem columnSpan={3}>
            <FacetPicker {...this.props} {...this.state} setFacet={this._setFacet} />
          </GridItem>
          <GridItem columnSpan={9}>
              <Stack directionType="vertical" alignmentType="fill">
                <StackItem>
                  <Chart {...this.props} {...this.state} />
                </StackItem>
                <StackItem>
                  <Debug title="Facet Table"/>
                </StackItem>
              </Stack>
            </GridItem>
        </Grid>
      </StackItem>
    </Stack>
      }
}
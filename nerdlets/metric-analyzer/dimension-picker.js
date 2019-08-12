import React from "react"
import { Stack, StackItem } from 'nr1'

import nrdbQuery from '../common/nrdb-query'
import quote from '../common/quote'
import { getWhere } from './get-metric-query'

export default class DimensionPicker extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidUpdate(prevProps) {
    console.log("check update", prevProps.filters, this.props.filters)
    if ((prevProps.account !== this.props.account) ||
      (prevProps.metricName !== this.props.metricName) ||
      (prevProps.filters !== this.props.filters)) {
      
      console.log("reload")
      this.loadDimensions()
    }
  }

  async loadDimensions() {
    const { account, metricName } = this.props
    if (!metricName) return

    this.setState({ attributes: null })

    let where = `WHERE metricName = '${quote(metricName)}'`
    const filterWhare = getWhere(this.props)
    if (filterWhare) where = where.concat(` AND ${filterWhare}`)

    const nrql = `SELECT keySet() FROM Metric ${where}`
    let results = await nrdbQuery(account.id, nrql)
    const keys = results.
      filter(d => d.type == "string" && d.key !== "metricName").
      map(d => { return { name: d.key } })

    // get the # of unique values for each dimension
    const select = keys.map(d => `uniqueCount(${quote(d.name)}), latest(${quote(d.name)})`)
    results = await nrdbQuery(account.id, `SELECT ${select} FROM Metric ${where}`)

    keys.forEach(d => {
      d.count = results[0][`uniqueCount.${d.name}`]
      d.latest = results[0][`latest.${d.name}`]
    })

    const dimensions = keys.filter(k => k.count > 1)
    const attributes = keys.filter(k => k.count == 1)

    this.setState({ dimensions, attributes })
  }

  renderDimensionsTable() {
    const { dimensions } = this.state
    const { dimension, setDimension } = this.props
    if (!dimensions) return <div />

    return <div>
      <h4>Dimensions</h4>
      <table className="dimensions-table">
        <tbody>
          {dimensions.map(d => {
            const className = d.name == dimension ? "selected" : ""
            return <tr key={d.name} className={className} onClick={() => setDimension(d.name)}>
              <td>{d.name}</td>
              <td>{d.count}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  }

  renderAttributesTable() {
    const { attributes } = this.state
    if (!attributes) return <div />

    return <div>
      <h4>Attributes</h4>
      <table className="attributes-table">
        <tbody>
          {attributes.map(a => {
            return <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.latest}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  }

  render() {
    return <Stack directionType="vertical" alignmentType="fill">
      {/* <StackItem>
        {this.renderAttributesTable()}
      </StackItem> */}
      <StackItem>
        {this.renderDimensionsTable()}
      </StackItem>
    </Stack>
  }
}
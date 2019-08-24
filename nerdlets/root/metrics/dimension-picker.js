import React from "react"
import { Tabs, TabsItem, Stack, StackItem } from 'nr1'

import nrdbQuery from '../../lib/nrdb-query'
import quote from '../../lib/quote'

export default class DimensionPicker extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.account !== this.props.account) ||
      (prevProps.metricName !== this.props.metricName) ||
      (prevProps.filterWhere !== this.props.filterWhere)) {

      this.loadDimensions()
    }
  }

  async loadDimensions() {
    const { account, metricName, filterWhere } = this.props
    if (!metricName) return

    this.setState({ dimensions: null })

    let where = `WHERE metricName = '${quote(metricName)}'`
    if (filterWhere) where = where.concat(` AND ${filterWhere}`)

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

    return <Stack directionType="vertical" alignmentType="fill">
      {dimensions.map(d => {
        const selected = d.name == dimension ? "selected" : ""
        return <StackItem key={d.name} className={`dimension ${selected}`} >
          <div className={dimension} onClick={() => setDimension(d.name)}>
            {d.name} ({d.count})
            </div>
        </StackItem>
      })}
    </Stack>
  }

  renderAttributesTable() {
    const { attributes } = this.state
    if (!attributes) return <div />

    return <Stack directionType="vertical">
      {attributes.map(a => {
        return <StackItem key={`${a.name}:${a.value}`}>
          <span>{a.name}: {a.latest}</span>
        </StackItem>
      })}
    </Stack>
  }

  render() {
    return <Tabs>
      <TabsItem label="Dimensions" itemKey={1} key='1'>
        <div style={{ paddingTop: "16px" }}>
          {this.renderDimensionsTable()}
        </div>
      </TabsItem>
      <TabsItem label="Attributes" itemKey={2} key='2'>
        <div style={{ paddingTop: "16px", paddingRight: '8px' }}>
          {this.renderAttributesTable()}
        </div>
      </TabsItem>
    </Tabs>
  }
}
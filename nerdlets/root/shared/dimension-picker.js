import React from "react"
import { Tabs, TabsItem, Stack, StackItem, Spinner } from 'nr1'

import nrdbQuery from '../../lib/nrdb-query'
import quote from '../../lib/quote'

export default class DimensionPicker extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.account !== this.props.account) ||
      (prevProps.attribute !== this.props.attribute) ||
      (prevProps.eventType !== this.props.eventType) ||
      (prevProps.filterWhere !== this.props.filterWhere)) {

      this.loadDimensions()
    }
  }

  getNrql(select) {
    const { filterWhere, eventType, attribute } = this.props
    let whereClause = ['true']
    if(eventType == 'Metric') {
      whereClause.push(`metricName = '${attribute}'`)
    }
    if (filterWhere) whereClause.push(`${filterWhere}`)


    return `SELECT ${select} FROM ${quote(eventType)} WHERE ${whereClause.join(" AND ")}`
  }

  async loadDimensions() {
    const { account } = this.props
    const dimensions = []
    const attributes = []

    this.setState({ dimensions: null })

    // get all of the available string attributes
    let results = await nrdbQuery(account.id, this.getNrql("keySet()"))
    const keys = results.
      filter(d => d.type == "string" && d.key !== "metricName").
      map(d => { return { name: d.key } })

    const BATCH_SIZE = 50
    for(var i = 0; i < keys.length; i += BATCH_SIZE) {
      const batch = keys.slice(i, i+BATCH_SIZE)

      // get the # of unique values for each string attribute
      const select = batch.map(d => `uniqueCount(${quote(d.name)}), latest(${quote(d.name)})`)
      results = await nrdbQuery(account.id, this.getNrql(select))
      batch.forEach(d => {
        d.count = results[0][`uniqueCount.${d.name}`]
        d.latest = results[0][`latest.${d.name}`]

        if(d.count == 1) attributes.push(d)
        if(d.count > 1) dimensions.push(d)
      })
    }

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
    const {dimensions} = this.state

    if(!dimensions) return <Spinner/>
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
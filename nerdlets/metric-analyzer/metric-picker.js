import React from "react"
import Select from 'react-select'
import { Stack, StackItem } from 'nr1'

import nrdbQuery from '../common/nrdb-query'

export default class MetricPicker extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  async componentDidMount() {
    this.loadMetricNames()
  }

  // TODO currnetly only loads 1000 metric. We should reload
  // on every change of user input to search every metric name.
  async loadMetricNames() {
    const { account, setMetricName } = this.props

    const nrql = `SELECT uniques(metricName) FROM Metric`
    const results = await nrdbQuery(account.id, nrql)

    const metricNames = results.map(r => r.member).sort()
    this.setState({ metricNames })
    if (metricNames.length > 0) setMetricName(metricNames[0])
  }

  render() {
    const { metricNames } = this.state
    const { setMetricName } = this.props
    if (!metricNames) return <div />

    const options = metricNames.map(o => { return { value: o, label: o } })
    return <Stack alignmentType="baseline">
      <StackItem>
        <h3>Metric</h3>
      </StackItem>
      <StackItem grow>
        <Select
          options={options}
          selectOption={metricNames[0]}
          onChange={(s) => setMetricName(s.value)} />
      </StackItem>
    </Stack>

    return
  }
}
import React from "react"
import Select from 'react-select'
import { Stack, StackItem } from 'nr1'

import nrdbQuery from '../../lib/nrdb-query'

export default class MetricPicker extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    this.loadMetricNames()
  }

  componentDidUpdate({dataType, account}) {
    if(dataType != this.props.dataType ||
      account.id != this.props.account.id) {
        this.loadMetricNames()
      }
  }

  // TODO currently only loads 1000 metrics. We should reload
  // on change of user input strings
  async loadMetricNames() {
    const { account, setAttribute } = this.props

    const nrql = `SELECT uniques(metricName) FROM Metric`
    const results = await nrdbQuery(account.id, nrql)

    const metricNames = results.map(r => r.member).sort()
    this.setState({ metricNames })
<<<<<<< HEAD:nerdlets/metric-analyzer/metric-picker.js

    // FIXME for now default to a useful metric
    // if (metricNames.length > 0) setMetricName(metricNames[0])
    setMetricName("container_cpu_usage_seconds_total")
=======
    if (metricNames.length > 0) setAttribute(metricNames[0])
>>>>>>> metrics-and-events:nerdlets/root/metrics/metric-picker.js
  }

  render() {
    const { metricNames } = this.state
<<<<<<< HEAD:nerdlets/metric-analyzer/metric-picker.js
    const { setMetricName, metricName } = this.props
=======
    const { setAttribute, metricName } = this.props
>>>>>>> metrics-and-events:nerdlets/root/metrics/metric-picker.js
    if (!metricNames) return <div />

    const options = metricNames.map(o => { return { value: o, label: o } })
    return <Stack alignmentType="baseline">
      <StackItem>
        <h3>Metric</h3>
      </StackItem>
      <StackItem grow>
        <Select
          options={options}
<<<<<<< HEAD:nerdlets/metric-analyzer/metric-picker.js
          value={{value: metricName, label: metricName}}
          onChange={(s) => setMetricName(s.value)} />
=======
          value={{value: metricNames, label: metricName}}
          onChange={(s) => setAttribute(s.value)} />
>>>>>>> metrics-and-events:nerdlets/root/metrics/metric-picker.js
      </StackItem>
    </Stack>
  }
}
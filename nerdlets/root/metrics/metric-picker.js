import React from "react"
import Select from 'react-select'
import { Stack, StackItem } from 'nr1'

import nrdbQuery from '../../lib/nrdb-query'

function NoMetricData() {
  return <div style={{ margin: "8px" }}>
    <h1>No Metric Data Found</h1>
    <p>
      It's easy to collect and present dimensional metrics in New Relic One. Get started
      by following the setup instructions <a href="#">here</a>.
    </p>
    <p>
      <strong>Fix me.</strong>put in real documentation/getting started stuff here.
    </p>
  </div>
}

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
    const { account, setAttribute, setEventType } = this.props

    const nrql = `SELECT uniques(metricName) FROM Metric`
    const results = await nrdbQuery(account.id, nrql)

    const metricNames = results.map(r => r.member).sort()
    this.setState({ metricNames })
    if (metricNames.length > 0) {
      setAttribute(metricNames[0])
    }
    else {
      setAttribute(null)
    }
    setEventType('Metric')
  }

  render() {
    const { metricNames } = this.state
    const { setAttribute, metricName, account } = this.props
    if (!metricNames) return <div />

    if(metricNames.length == 0) {
      return <h2>No Metric Data in {account.name}</h2>
    }

    const options = metricNames.map(o => { return { value: o, label: o } })
    return (
      <div className="react-select-input-group">
        <label>Metric</label>
        <Select
          options={options}
          value={{ value: metricNames, label: metricName }}
          onChangef={s => setAttribute(s.value)}
          classNamePrefix="react-select"
        />
      </div>
    )
  }
}
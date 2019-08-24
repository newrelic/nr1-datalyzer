import React from "react"
import { Stack, StackItem } from 'nr1'

import MetricPicker from './metric-picker'
import FunctionPicker from './function-picker'
import quote from '../../lib/quote'

export default class Header extends React.Component {
  constructor(props) {
    super(props)

    this._setMetricName = this._setMetricName.bind(this)
    this._setFunction = this._setFunction.bind(this)

    this.state = { fn: 'average', filters: {}, filterWhere: null }
  }

  onStateChange(prevProps) {
    if (prevProps.account.id != this.props.account.id) {
      this.setState({ dimension: null, filters: {}, metricName: null }).then(this.updateSelect)
    }
  }

  _setMetricName(metricName) {
    this.setState({ metricName, filters: {}, filterWhere: null }).then(this.updateSelect)
  }

  _setFunction(fn) {
    this.setState({ fn }).then(this.updateSelect)
  }

  updateSelect() {
    const {metricName, fn} = this.state
    let select = null
    if(metricName && fn) select = `SELECT ${fn}(${quote(metricName)}) FROM Metric`
    this.props.setSelect(select)
  }

  

  render() {
    return <Stack alignmentType="baseline">
      <StackItem grow>
        <MetricPicker {...this.props} {...this.state} setMetricName={this._setMetricName} />
      </StackItem>
      <StackItem>
        <FunctionPicker {...this.props} {...this.state} setFunction={this._setFunction} />
      </StackItem>
    </Stack>
  }
}
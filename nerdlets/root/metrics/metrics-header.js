import React from "react"
import { Stack, StackItem } from 'nr1'

import AccountPicker from '../account-picker'
import DataTypePicker from '../data-type-picker'
import MetricPicker from './metric-picker'
import FunctionPicker from '../function-picker'

export default class MetricsHeader extends React.Component {
  render() {

    return <div className="utility-bar">
      <AccountPicker {...this.props} />
      <DataTypePicker {...this.props} dataType="metric" />
      <hr />
      <MetricPicker {...this.props} {...this.state}/>
      <FunctionPicker {...this.props} {...this.state}/>
    </div>
  }
}
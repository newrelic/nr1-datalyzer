import React from "react"
import { Stack, StackItem } from 'nr1'

import MetricPicker from './metric-picker'
import FunctionPicker from '../function-picker'

export default class EventsHeader extends React.Component {
  render() {
    return <Stack alignmentType="baseline">
      <StackItem grow>
        <MetricPicker {...this.props} {...this.state} />
      </StackItem>
      <StackItem>
        <FunctionPicker {...this.props} {...this.state}/>
      </StackItem>
    </Stack>
  }
}
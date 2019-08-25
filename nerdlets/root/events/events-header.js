import React from "react"
import { Stack, StackItem } from 'nr1'

import EventTypePicker from './event-type-picker'
import AttributePicker from './attribute-picker'

import FunctionPicker from '../shared/function-picker'

export default class EventsHeader extends React.Component {
  render() {
    return <Stack alignmentType="baseline">
      <StackItem grow>
        <EventTypePicker {...this.props} {...this.state} />
      </StackItem>
      <StackItem>
        <AttributePicker {...this.props} {...this.state}/>
      </StackItem>
      <StackItem>
        <FunctionPicker {...this.props} {...this.state}/>
      </StackItem>
    </Stack>
  }
}
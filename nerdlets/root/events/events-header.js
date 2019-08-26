import React from "react"
import { Stack, StackItem, Grid, GridItem } from 'nr1'

import EventTypePicker from './event-type-picker'
import AttributePicker from './attribute-picker'

import FunctionPicker from '../function-picker'

export default class EventsHeader extends React.Component {
  render() {
    const { setAccount } = this.props

    return (
      <div className="utility-bar">
        <EventTypePicker {...this.props} {...this.state} />
        <AttributePicker {...this.props} {...this.state} />
        <FunctionPicker {...this.props} {...this.state} />
      </div>
    )
  }
}
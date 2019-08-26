import React from "react"
import { Stack, StackItem, Grid, GridItem } from 'nr1'

import EventTypePicker from './event-type-picker'
import AttributePicker from './attribute-picker'

import FunctionPicker from '../function-picker'

export default class EventsHeader extends React.Component {
  render() {
    return <Stack alignmentType="baseline">
      <StackItem grow>
        <Grid>
          <GridItem columnSpan={4}>
            <EventTypePicker {...this.props} {...this.state} />
          </GridItem>
          <GridItem columnSpan={8}>
            <AttributePicker {...this.props} {...this.state}/>
          </GridItem>
        </Grid>
      </StackItem>
      <StackItem>
        <FunctionPicker {...this.props} {...this.state}/>
      </StackItem>
    </Stack>
  }
}
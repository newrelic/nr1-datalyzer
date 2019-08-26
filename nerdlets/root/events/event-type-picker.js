import React from "react"
import Select from 'react-select'
import { Stack, StackItem } from 'nr1'

import nrdbQuery from '../../lib/nrdb-query'

export default class EventTypePicker extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    this.loadEventTypes()
  }

  componentDidUpdate({dataType, account}) {
    if(dataType != this.props.dataType ||
      account.id != this.props.account.id) {
        this.loadEventTypes()
      }
  }

  async loadEventTypes() {
    const { account, setEventType } = this.props

    const nrql = `SHOW EVENT TYPES`
    const results = await nrdbQuery(account.id, nrql)

    const eventTypes = results.map(r => r.eventType).sort()
    this.setState({ eventTypes })
    if (eventTypes.length > 0) setEventType(eventTypes[0])
  }

  render() {
    const { eventTypes } = this.state
    const { setEventType, eventType } = this.props
    if (!eventTypes) return <div />

    const options = eventTypes.map(o => { return { value: o, label: o } })
    return <Stack alignmentType="baseline">
      <StackItem>
        <h3>Event Type</h3>
      </StackItem>
      <StackItem grow>
        <Select
          options={options}
          value={{value: eventType, label: eventType}}
          onChange={(s) => setEventType(s.value)} />
      </StackItem>
    </Stack>
  }
}
import React from "react"
import { Stack, StackItem } from 'nr1'
import Select from 'react-select'

import quote from '../../lib/quote'
import nrdbQuery from '../../lib/nrdb-query'

function label(attr) {
  if(attr == "__count__") return "count(*)"
  return attr
}
export default class AttributePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidUpdate({eventType, dataType}) {
    if(eventType != this.props.eventType ||
      dataType != this.props.dataType) {
      this.loadAttributes()
    }
  }

  async loadAttributes() {
    const {account, eventType, setAttribute} = this.props
    const nrql = `SELECT keySet() FROM ${quote(eventType)}`

    // simplify the menu by filtering out all string attributes, as well
    // as numeric attributes that end in "_id" or "Id" (which are assumed
    // to be identifiers and not really worth plotting as numerical data)
    const attributes = (await nrdbQuery(account.id, nrql))
      .filter(a => a.type == 'numeric')
      .map(a => a.key)
      .filter(a => !(a.endsWith("_id") || a.endsWith("Id") || a == "timestamp"))

    attributes.unshift("__count__")

    this.setState({attributes})
    setAttribute(attributes[0])
  }

  render() {
    const {attributes} = this.state
    const {attribute, setAttribute} = this.props
    if(!attributes) return <div/>
    
    const options = attributes.map(o => { return { value: o, label: label(o) }})
    return <Stack alignmentType="baseline">
      <StackItem>
        <h3>Plot</h3>
      </StackItem>
      <StackItem grow>
        <Select
          options={options}
          value={{value: attribute, label: label(attribute)}}
          onChange={(a) => setAttribute(a.value)} />
      </StackItem>
    </Stack>

  }
}
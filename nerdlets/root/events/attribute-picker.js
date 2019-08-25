import React from "react"

import quote from '../../lib/quote'
import nrdbQuery from '../../lib/nrdb-query'

export default class AttributePicker extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.eventType != this.props.eventType) {
      this.loadAttributes()
    }
  }

  async loadAttributes() {
    const {accountId, eventType} = this.props
    const nrql = `SELECT keySet() FROM ${quote(eventType)}`
    const results = await nrdbQuery(accountId, nrql)
    console.log(results)    
  }
  
  render() {
    return "Attribute:"
  }
}
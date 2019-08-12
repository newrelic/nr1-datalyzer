import React from "react"

export default class EventPicker extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {eventType} = this.props
    
    return <h2>{eventType.name}</h2>
  }
}
import React from "react"
import { Stack, StackItem, Button } from 'nr1'

function Filter({ attribute, value, removeFilter }) {

  return <div className="filter">
    <span>
      {attribute}: {value}
    </span>
    <Button
      iconType="interface_operations_remove_v-alternate"
      sizeType="slim"
      type="plainNeutral"
      onClick={() => removeFilter(attribute, value)}
    />
  </div>
}

export default class Filters extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { removeFilter } = this.props
    const filters = []

    Object.keys(this.props.filters).forEach(attribute => {
      const values = this.props.filters[attribute]
      values.forEach(value => filters.push({ attribute, value }))
    })

    if (filters.length == 0) return ''

    return <div className="filters-container">
      <h3 className="filters-header">Filters:</h3>
      {filters.map(({ attribute, value }) => {
        return <Filter 
          key={`${attribute}/${value}`} 
          attribute={attribute} 
          value={value} 
          removeFilter={removeFilter}/>
      })}
    </div>
  }
}
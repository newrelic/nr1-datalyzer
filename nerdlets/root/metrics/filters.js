import React from "react"
import { Stack, StackItem, Button } from 'nr1'

function Filter({ attribute, value, removeFilter }) {

  return <StackItem key={`${attribute}/${value}`} className="filter">
    <span>
      {attribute}: {value}
    </span>
    <Button
      iconType="interface_operations_remove_v-alternate"
      sizeType="slim"
      type="plainNeutral"
      onClick={() => removeFilter(attribute, value)}
    />
  </StackItem>
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

    return <Stack alignmentType="baseline">
      <StackItem>
        <h3>Filters:</h3>
      </StackItem>
      {filters.map(({ attribute, value }) => {
        return <Filter attribute={attribute} value={value} removeFilter={removeFilter}/>
      })}
    </Stack>
  }
}
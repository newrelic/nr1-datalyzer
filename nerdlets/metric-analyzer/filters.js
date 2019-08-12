import React from "react"
import {Stack, StackItem} from 'nr1'

function Filter({attribute, value}) {
  return <span className="filter">
    {attribute}: {value}
  </span>
}
export default class Filters extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const filters = []
    
    Object.keys(this.props.filters).forEach(attribute => {
      const values = this.props.filters[attribute]
      values.forEach(value => filters.push({attribute, value}))
    })

    return <Stack alignmentType="baseline">
      <StackItem>
        <h3>Filters:</h3>
      </StackItem>
      {filters.map(({attribute, value}) => {
        return <StackItem key={`${attribute}/${value}`}>
          <Filter attribute={attribute} value={value} />
        </StackItem>
      })}
    </Stack>
  }
}
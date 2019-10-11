import React from "react"
import Select from 'react-select'
import {Stack, StackItem } from 'nr1'

const FUNCTIONS = [
  {fn: 'average', label: 'avg'},
  {fn: 'sum', label: 'sum'},
  {fn: 'latest', label: 'latest'},
  {fn: 'median', label: 'median'},
  {fn: 'max', label:'max'}
]

export default class FunctionPicker extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {fn, setFunction, attribute} = this.props
    const isCount = attribute == "__count__"

    if(!attribute || isCount) return <div/>

    const options = FUNCTIONS
    return (
      <div className="react-select-input-group">
        <label>Function</label>
        <Select
          options={options}
          value={{ value: fn, label: 'label' }} //TODO: get label to update based on state
          onChange={s => setFunction(s.fn)}
          classNamePrefix="react-select"
        />
      </div>
    )
  }
}
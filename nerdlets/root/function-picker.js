import React from "react"
import Select from 'react-select'
import {Stack, StackItem } from 'nr1'

const FUNCTIONS = [
  {value: 'average', label: 'Average'},
  {value: 'sum', label: 'Sum'},
  {value: 'latest', label: 'Latest'},
  {value: 'median', label: 'Median'},
  {value: 'max', label:'Maximum'},
  {value: 'min', label:'Minimum'}
]

export default class FunctionPicker extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {value, setFunction, attribute} = this.props
    const isCount = attribute == "__count__"

    if(!attribute || isCount) return <div/>

    const options = FUNCTIONS
    return (
      <div className="react-select-input-group">
        <label>Function</label>
        <Select
          options={options}
          onChange={s => setFunction(s.value)}
          classNamePrefix="react-select"
        />
      </div>
    )
  }
}
import React from "react"
import {Stack, StackItem, Radio} from 'nr1'

const FUNCTIONS = [
  {fn: 'average', label: 'avg'},
  {fn: 'sum', label: 'sum'},
]
const FUNCTIONS2 = [
  {fn: 'latest', label: 'latest'},
  {fn: 'median', label: 'median'}
]

export default class FunctionPicker extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {fn, setFunction, attribute} = this.props
    const isCount = attribute == "__count__"

    if(!attribute || isCount) return <div/>

    return <div className="function-picker-radio-container">
      <div className="function-picker-radio-container-child">
        {FUNCTIONS.map(f => {
          const checked = fn == f.fn
          return (
            <Radio
              key={f.fn}
              onClick={() => setFunction(f.fn)}
              checked={checked}
              label={f.label}
              className="function-picker-radio"
              />
          )
        })}
      </div>
      <div className="function-picker-radio-container-child">
        {FUNCTIONS2.map(f => {
          const checked = fn == f.fn
          return (
            <Radio
              key={f.fn}
              onClick={() => setFunction(f.fn)}
              checked={checked}
              label={f.label}
              className="function-picker-radio"
              />
          )
        })}
      </div>
    </div>
  }
}

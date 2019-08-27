import React from "react"
import {Stack, StackItem, Radio} from 'nr1'

const FUNCTIONS = [
  {fn: 'average', label: 'avg'},
  {fn: 'sum', label: 'sum'},
]

export default class FunctionPicker extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {fn, setFunction, attribute} = this.props

    if(!attribute) return <div/>
    const disabled = attribute == "__count__"

    return <div className="function-picker-radio-container">
      {FUNCTIONS.map(f => {
        const checked = fn == f.fn
        return (
          <Radio
            key={f.fn}
            onClick={() => setFunction(f.fn)}
            disabled={disabled}
            checked={checked}
            label={f.label}
            className="function-picker-radio"
            />
        )
      })}

    </div>
  }
}
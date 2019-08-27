import React from "react"
import Select from "react-select"
import { Stack, StackItem } from "nr1"

export default class AccountPicker extends React.PureComponent {
  render() {
    const { account, accounts, setAccount } = this.props
    
    const options = accounts.map(a => {
      return { value: a.id, label: a.name }
    })
    const selectedOption = { value: account.id, label: account.name }

    return (
      <div className="react-select-input-group account-picker">
        <label>Account</label>
        <Select
          options={options}
          label="hi there"
          value={selectedOption}
          isMulti={false}
          onChange={({ value }) =>
            setAccount(accounts.find(a => a.id == value))
          }
          classNamePrefix="react-select"
        />
      </div>
    )
  }
}

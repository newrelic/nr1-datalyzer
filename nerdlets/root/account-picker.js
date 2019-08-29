import React from "react"
import Select from "react-select"
import { Dropdown, DropdownItem } from "nr1"

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

  // TODO when dropdown supports label and we get
  // styling help, switch over to it for all the dropdowns
  // and remove react-select depenency
  renderWithNRDropDown() {
    let { account, accounts, setAccount } = this.props
    const {filter} = (this.state || {})
    
    if(filter && filter.length > 0) {
      const re = new RegExp(filter, 'i')
      accounts = accounts.filter(a => {
        return a.name.match(re)
      })
    }

    return <Dropdown title={account.name} filterable label="Account"
        onChangeFilter={(event) => this.setState({filter: event.target.value})}>
      {accounts.map(a => {
        return <DropdownItem key={a.id} onClick={() => setAccount(a)}>
          {a.name}
        </DropdownItem>
      })}
    </Dropdown>
  }
}

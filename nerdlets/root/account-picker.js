import React from 'react';
import Select from 'react-select'

export default class AccountPicker extends React.PureComponent {
  render() {    
    const {account, accounts, setAccount} = this.props 
    const options = accounts.map(a => {
      return { value: a.id, label: a.name}
    })

    return <Select 
        options={options} 
        value={account.id}
        isMulti={false}
        onChange={({value}) => setAccount(value)}
        />
  }
}
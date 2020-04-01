import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownItem } from 'nr1';

export default class AccountPicker extends React.PureComponent {
  static propTypes = {
    account: PropTypes.object,
    accounts: PropTypes.array,
    setAccount: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      filter: ''
    };
  }

  render() {
    let { account, accounts, setAccount } = this.props;
    const { filter } = this.state;

    if (filter && filter.length > 0) {
      const re = new RegExp(filter, 'i');
      accounts = accounts.filter(a => {
        return a.name.match(re);
      });
    }

    return (
      <Dropdown
        title={account.name}
        search={filter}
        onSearch={event => this.setState({ filter: event.target.value })}
        className="accountPicker"
      >
        {accounts.map(a => {
          return (
            <DropdownItem key={a.id} onClick={() => setAccount(a)}>
              {a.name}
            </DropdownItem>
          );
        })}
      </Dropdown>
    );
  }
}

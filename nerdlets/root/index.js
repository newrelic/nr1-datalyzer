import React from 'react';
import PropTypes from 'prop-types';

import { NerdGraphQuery, Stack, StackItem } from 'nr1'

import AccountPicker from './account-picker'
import Analyzer from './metrics/analyzer'

function NoMetricData() {
  return <div style={{ margin: "8px" }}>
    <h1>No Metric Data Found</h1>
    <p>
      It's easy to collect and present dimensional metrics in New Relic One. Get started
      by following the setup instructions <a href="#">here</a>.
    </p>
    <p>
      <strong>Fix me.</strong>put in real documentation/getting started stuff here.
    </p>
  </div>
}

export default class MetricAnalyzer extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
  }

  constructor(props) {
    super(props)

    this._setAccount = this._setAccount.bind(this)
    this.state = {}
  }

  _setAccount(account) {
    this.setState({account})
  }

  async componentDidMount() {
    // get all accounts that report a "Metric" data type
    let gql = `{actor {accounts {name id reportingEventTypes(filter: "Metric")}}}`
    let { data } = await NerdGraphQuery.query({ query: gql })

    const accounts = data.actor.accounts.filter(a => a.reportingEventTypes.length > 0)
    const account = accounts.length > 0 && accounts[0]
    this.setState({ accounts, account })
  }

  render() {
    const { accounts, account } = this.state
    if (!accounts) return ""
    if (accounts.length == 0) return <NoMetricData />

    return <div style={{ margin: "8px" }}>
      <Stack directionType="vertical" alignmentType="fill">
        <StackItem>
          <Stack distributionType="fill" alignmentType="trailing">
            <StackItem grow>
              <h1>Metrics</h1>
            </StackItem>
            <StackItem>
              <AccountPicker {...this.state} setAccount={this._setAccount} />
            </StackItem>
          </Stack>
        </StackItem>
        <StackItem grow>
          <Analyzer {...this.state} />
        </StackItem>
      </Stack>
    </div>
  }
}

import React from 'react';
import PropTypes from 'prop-types';

import { NerdGraphQuery, Stack, StackItem, Tabs, TabsItem, Radio } from 'nr1'

import AccountPicker from './account-picker'
import DataTypePicker from './data-type-picker'

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
    this._setDataType = this._setDataType.bind(this)

    this.state = {dataType: 'metric'}
  }

  _setAccount(account) {
    this.setState({account})
  }

  _setDataType(dataType) {
    this.setState({dataType})
  }

  async componentDidMount() {
    // get all user accessible accounts
    let gql = `{actor {accounts {name id}}}`
    let { data } = await NerdGraphQuery.query({ query: gql })
    console.log(data)

    const {accounts} = data.actor
    const account = accounts.length > 0 && accounts[0]
    this.setState({ accounts, account })
  }

  render() {
    const { accounts, dataType } = this.state
    if (!accounts) return ""
    if (accounts.length == 0) return <NoMetricData />

    return <div style={{ margin: "8px" }}>
      <Stack directionType="vertical" alignmentType="fill">
        <StackItem>
          <Stack alignmentType={Stack.ALIGNMENT_TYPE.CENTER} distributionType="fill">
            <StackItem grow>
              <AccountPicker {...this.state} setAccount={this._setAccount} />
            </StackItem>
            <StackItem>
              <DataTypePicker dataType={dataType} setDataType={this._setDataType}/>
            </StackItem>
          </Stack>
        </StackItem>
        <StackItem grow>
          {dataType == 'metric' && <Analyzer {...this.state} />}
          {dataType == 'event' && <h1>Event Analyzer</h1>}  
        </StackItem>
      </Stack>
    </div>
  }
}

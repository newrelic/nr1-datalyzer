import React from 'react';
import PropTypes from 'prop-types';

import { NerdGraphQuery, Stack, StackItem, Spinner } from 'nr1';
import AccountPicker from '../common/account-picker'
import EventTypePicker from './event-type-picker'
import Datalyzer from './datalyzer'

export default class Root extends React.PureComponent {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
  }

  constructor(props) {
    super(props)

    this._setAccount = this._setAccount.bind(this)
    this._setEventType = this._setEventType.bind(this)

    this.state = {}
  }

  async componentDidMount() {
    let result = await NerdGraphQuery.query({ query: `{actor { accounts { id name reportingEventTypes }}}` })
    const accounts = result.data.actor.accounts

    await this.setState({ accounts })
    // this._setAccount(accounts[0].id)
    this._setAccount(332029)
  }

  _setEventType(eventType) {
    this.setState({eventType})
  }

  async _setAccount(accountId) {
    const { accounts } = this.state
    const account = accounts.find(a => a.id == accountId)

    console.log("Set account", account.name)
    await this.setState({account, eventTypes: null})

    let eventTypes = []

    // to sort by event throughput (rough approximation for popularity, filtering out rarely used events)
    // construct a single grapqhl query that calls "SELECT count(*) FROM {eventType} SINCE 15 minutes ago" 
    // for every event type. Less chatty, and NerdGraph will throttle throughput to NRDB appropriately.
    // run in batches.
    const batchSize = 30    
    for (var i = 0; i < account.reportingEventTypes.length; i += batchSize) {
      const batch = account.reportingEventTypes.slice(i, i + batchSize).filter(e => !e.match(/\s|\./ && e !== "Metric"))
      const gql = `{
          actor {
            account(id: ${accountId}) {
              ${batch.map(eventType => {
                return `${eventType}: nrql(query: "SELECT count(*) FROM \`${eventType}\` SINCE 10 minutes ago") { results eventDefinitions { definition } }`
              }).join("\n")}
            }
          }
        }`
      const results = await NerdGraphQuery.query({ query: gql })
      batch.forEach(eventType => {
        const et = results.data.actor.account[eventType]
        const count = et.results[0].count
        const definition = (et.eventDefinitions.shift() || {}).definition
        eventTypes.push({ name: eventType, count, definition })
      })
    }
    eventTypes = eventTypes.sort((x, y) => y.count - x.count)

    await this.setState({ eventTypes, eventType: eventTypes[1] })
  }

  render() {
    const { accounts, account, eventTypes, eventType } = this.state
    if(!account) return ""

    return 
  }
}

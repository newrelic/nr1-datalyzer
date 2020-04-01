import React from 'react';
import {
  PlatformStateContext,
  NerdletStateContext,
  EntityByGuidQuery,
  NerdGraphQuery,
  Spinner
} from 'nr1';
import { NerdGraphError } from '@newrelic/nr1-community';
import gql from 'graphql-tag';
import get from 'lodash.get';
import Analyzer from './analyzer';

const entityFragmentExtension = gql`
  fragment EntityFragmentExtension on EntityOutline {
    account {
      name
      id
    }
    name
    domain
    type
    guid
    ... on ApmApplicationEntityOutline {
      applicationId
    }
    ... on BrowserApplicationEntityOutline {
      applicationId
    }
    ... on MobileApplicationEntityOutline {
      applicationId
    }
  }
`;

export default class RootNerdlet extends React.PureComponent {
  constructor(props) {
    super(props);
    this._setAccount = this._setAccount.bind(this);
    this._setDataType = this._setDataType.bind(this);

    this.state = { dataType: 'event', account: null };
  }

  _setAccount(account) {
    this.setState({ account });
  }

  _setDataType(dataType) {
    this.setState({ dataType });
  }

  render() {
    const { dataType } = this.state;
    let { account } = this.state; // if we don't have an account, we're going to default to one below
    return (
      <NerdletStateContext.Consumer>
        {nerdletUrlState => {
          // entity explorer
          if (nerdletUrlState && nerdletUrlState.entityGuid) {
            return (
              <EntityByGuidQuery
                entityGuid={nerdletUrlState.entityGuid}
                entityFragmentExtension={entityFragmentExtension}
              >
                {({ loading, error, data }) => {
                  if (loading) {
                    return <Spinner fillContainer />;
                  }

                  if (error) {
                    return <NerdGraphError error={error} />;
                  }
                  // console.log(data);
                  const entity = get(data, 'entities[0]');
                  return (
                    <PlatformStateContext.Consumer>
                      {platformUrlState => (
                        <Analyzer
                          nerdletUrlState={nerdletUrlState}
                          platformUrlState={platformUrlState}
                          dataType={dataType}
                          account={entity.account}
                          entity={entity}
                          setAccount={this._setAccount}
                          setDataType={this._setDataType}
                        />
                      )}
                    </PlatformStateContext.Consumer>
                  );
                }}
              </EntityByGuidQuery>
            );
          } else {
            // launcher
            return (
              <NerdGraphQuery query={`{actor {accounts {name id}}}`}>
                {({ loading, error, data }) => {
                  if (loading) {
                    return <Spinner fillContainer />;
                  }

                  if (error) {
                    return <NerdGraphError error={error} />;
                  }

                  const accounts = get(data, 'actor.accounts');
                  account = account || accounts[0];
                  return (
                    <PlatformStateContext.Consumer>
                      {platformUrlState => (
                        <Analyzer
                          nerdletUrlState={nerdletUrlState}
                          platformUrlState={platformUrlState}
                          dataType={dataType}
                          account={account}
                          accounts={accounts}
                          setAccount={this._setAccount}
                          setDataType={this._setDataType}
                        />
                      )}
                    </PlatformStateContext.Consumer>
                  );
                }}
              </NerdGraphQuery>
            );
          }
        }}
      </NerdletStateContext.Consumer>
    );
  }
}

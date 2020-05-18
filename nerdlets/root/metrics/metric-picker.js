import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Stack, StackItem, BlockText } from 'nr1';

import nrdbQuery from '../../lib/nrdb-query';

function NoMetricData() {
  return (
    <Stack directionType={Stack.DIRECTION_TYPE.VERTICAL}>
      <StackItem>
        <h3>No Dimensional Metric Data in this Account</h3>
      </StackItem>
      <StackItem>
        <BlockText>
          Import dimensional metric data from Prometheus today! Learn more{' '}
          <a href="#">here!</a>
        </BlockText>
      </StackItem>
    </Stack>
  );
}

export default class MetricPicker extends React.PureComponent {
  static propTypes = {
    dataType: PropTypes.string,
    account: PropTypes.object,
    setAttribute: PropTypes.func,
    attribute: PropTypes.string,
    entity: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.loadMetricNames();
  }

  componentDidUpdate({ dataType, account }) {
    if (
      dataType !== this.props.dataType ||
      account.id !== this.props.account.id
    ) {
      this.loadMetricNames();
    }
  }

  // TODO currently only loads 1000 metrics. We should reload
  // on change of user input strings
  async loadMetricNames() {
    const { account, setAttribute, entity } = this.props;
    const domain = entity && entity.domain;

    let nrql = `SELECT uniques(metricName) as member FROM Metric`;
    if (domain === 'INFRA') {
      nrql = `${nrql} WHERE entityGuid = '${entity.guid}'`;
    } else if (domain === 'APM' || domain === 'EXT') {
      nrql = `${nrql} WHERE entity.guid = '${entity.guid}'`;
    } else if (entity) {
      nrql = `${nrql} WHERE appId = ${entity.applicationId}`;
    } else {
      nrql = `${nrql} WHERE entity.guid IS NULL AND entityGuid IS NULL`;
    }
    const results = await nrdbQuery(account.id, nrql);

    const metricNames = results
      .map(r => r.member)
      .flat()
      .sort();
    this.setState({ metricNames });

    if (metricNames.length > 0) {
      await setAttribute(metricNames[0]);
    } else {
      await setAttribute(null);
    }
  }

  render() {
    const { metricNames } = this.state;
    const { setAttribute, attribute } = this.props;
    if (!metricNames) return <div />;

    if (metricNames.length === 0) {
      return <NoMetricData />;
    }
    const options = metricNames.map(o => {
      return { value: o, label: o };
    });
    return (
      <div className="react-select-input-group">
        <label>Metric</label>
        <Select
          options={options}
          value={{ value: attribute, label: attribute }}
          onChange={s => setAttribute(s.value)}
          classNamePrefix="react-select"
        />
      </div>
    );
  }
}

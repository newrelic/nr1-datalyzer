import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, TabsItem, Spinner } from 'nr1';

import nrdbQuery from '../lib/nrdb-query';
import quote from '../lib/quote';
import { timeRangeToNrql } from '@newrelic/nr1-community';
import Attribute from './attribute';

export default class DimensionPicker extends React.PureComponent {
  static propTypes = {
    attribute: PropTypes.string,
    eventType: PropTypes.string,
    dimension: PropTypes.string,
    account: PropTypes.object,
    entity: PropTypes.object,
    platformUrlState: PropTypes.object,
    setDimension: PropTypes.func,
    filterWhere: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.account !== this.props.account ||
      prevProps.attribute !== this.props.attribute ||
      prevProps.eventType !== this.props.eventType ||
      prevProps.filterWhere !== this.props.filterWhere
    ) {
      this.loadDimensions();
    }
  }

  getNrql(select) {
    const {
      filterWhere,
      eventType,
      attribute,
      entity,
      platformUrlState
    } = this.props;
    const timeRange = timeRangeToNrql(platformUrlState);
    const domain = entity && entity.domain;
    const isMetric = eventType === 'Metric';

    const whereClause = [];
    if (isMetric && attribute) {
      whereClause.push(`${attribute} IS NOT NULL`);
    }

    // eslint-disable-next-line prettier/prettier
    if (domain === 'INFRA' || domain === 'EXT' ||(domain === 'APM' && isMetric)) {
      whereClause.push(`entity.guid = '${entity.guid}'`);
    } else if (entity) {
      whereClause.push(`appId = ${entity.applicationId}`);
    }
    if (filterWhere) whereClause.push(`${filterWhere}`);
    if (whereClause.length === 0) whereClause.push('true');

    // eslint-disable-next-line prettier/prettier
    return `SELECT ${select} FROM ${quote(eventType)} WHERE ${whereClause.join(' AND ')} ${timeRange}`;
  }

  async loadDimensions() {
    const { account } = this.props;
    const dimensions = [];
    const attributes = [];

    this.setState({ dimensions: null });
    if (!this.props.eventType) return;

    // get all of the available string attributes
    const results = await nrdbQuery(account.id, this.getNrql('keySet()'));
    const keys = results
      .filter(d => d.type === 'string' && d.key !== 'metricName')
      .map(d => {
        return { name: d.key };
      });

    const BATCH_SIZE = 50;
    for (let i = 0; i < keys.length; i += BATCH_SIZE) {
      const batch = keys.slice(i, i + BATCH_SIZE);

      // get the # of unique values for each string attribute
      const select = batch.map(d => `uniqueCount(${quote(d.name)})`);
      const results2 = await nrdbQuery(account.id, this.getNrql(select));
      batch.forEach(d => {
        d.count = results2[0][`uniqueCount.${d.name}`];

        if (d.count === 1) attributes.push(d);
        if (d.count > 1) dimensions.push(d);
      });
    }

    // get the attribute values
    if (attributes.length > 0) {
      const select = attributes.map(d => `latest(${quote(d.name)})`).join(', ');
      const attributeValues = await nrdbQuery(account.id, this.getNrql(select));
      attributes.forEach(d => {
        d.latest = attributeValues[0][`latest.${d.name}`];
      });
    }

    this.setState({ dimensions, attributes });
  }

  renderDimensionsTable() {
    const { dimensions } = this.state;
    const { dimension, setDimension } = this.props;
    if (!dimensions) return <div />;

    return (
      <ul className="dimensions-table">
        {dimensions.map(d => {
          const selected = d.name === dimension ? 'selected' : '';
          return (
            <li
              key={d.name}
              className={`dimensions-table-item ${
                dimension !== undefined ? dimension : ''
              } ${selected}`}
              onClick={() => setDimension(d.name)}
            >
              {d.name} ({d.count})
            </li>
          );
        })}
      </ul>
    );
  }

  renderAttributesTable() {
    const { attributes } = this.state;
    if (!attributes) return <div />;

    return (
      <ul className="attributes-container">
        {attributes.map(a => {
          return (
            <li key={`${a.name}`}>
              <Attribute name={a.name} value={a.latest} />
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    const { dimensions } = this.state;
    const { attribute } = this.props;

    if (!attribute) return <div />;
    if (!dimensions) return <Spinner />;

    if (dimensions.length < 10) {
      return (
        <>
          <h3 className="dimensions-table-header">Dimensions</h3>
          {this.renderDimensionsTable()}
          <h3 className="attributes-table-header">Attributes</h3>
          {this.renderAttributesTable()}
        </>
      );
    }

    return (
      <Tabs className="col-1-tabs-container">
        <TabsItem
          className="col-1-tabs-item"
          label="Dimensions"
          value={1}
          key="1"
        >
          <div className="dimensions-table-container">
            {this.renderDimensionsTable()}
          </div>
        </TabsItem>
        <TabsItem
          className="col-1-tabs-item"
          label="Attributes"
          value={2}
          key="2"
        >
          {this.renderAttributesTable()}
        </TabsItem>
      </Tabs>
    );
  }
}

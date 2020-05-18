import React from 'react';
import PropTypes from 'prop-types';
import { Grid, GridItem, Spinner } from 'nr1';

import DimensionPicker from './dimension-picker';
import Chart from './chart';
import FacetTable from './facet-table';
import Filters from './filters';
import { getFilterWhere } from './get-query';
import MetricsHeader from './metrics/metrics-header';
import EventsHeader from './events/events-header';

export default class Analyzer extends React.PureComponent {
  static propTypes = {
    eventType: PropTypes.string,
    account: PropTypes.object,
    accounts: PropTypes.array,
    dataType: PropTypes.string,
    filterWhere: PropTypes.string,
    entity: PropTypes.object
  };

  constructor(props) {
    super(props);

    this._setAttribute = this._setAttribute.bind(this);
    this._setDimension = this._setDimension.bind(this);
    this._setEventType = this._setEventType.bind(this);
    this._setFunction = this._setFunction.bind(this);
    this._setFilter = this._setFilter.bind(this);
    this._removeFilter = this._removeFilter.bind(this);

    this.state = {
      fn: 'average',
      filters: {},
      filterWhere: null,
      eventType: this.props.eventType
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.account.id !== this.props.account.id ||
      prevProps.dataType !== this.props.dataType
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        dimension: null,
        attribute: null,
        filters: {},
        filterWhere: null
      });
    }
  }

  _setAttribute(attribute) {
    let { eventType } = this.state;
    const { dataType } = this.props;

    if (dataType === 'metric') {
      eventType = 'Metric';
    }

    this.setState({
      attribute,
      eventType,
      dimension: null,
      filters: {},
      filterWhere: null
    });
  }

  _setDimension(dimension) {
    this.setState({ dimension });
  }

  _setEventType(eventType) {
    this.setState({
      eventType,
      dimension: null,
      filters: {},
      filterWhere: null
    });
  }

  _setFunction(fn) {
    this.setState({ fn });
  }

  _setFilter(dimension, value) {
    const { filters } = this.state;
    filters[dimension] = filters[dimension] || [];
    if (!filters[dimension].includes(value)) {
      filters[dimension].push(value);
    }
    const options = this.state;
    const filterWhere = getFilterWhere(options, filters);
    this.setState({ filters, filterWhere, dimension: null });
  }

  _removeFilter(attribute, value) {
    const { filters } = this.state;
    filters[attribute] = filters[attribute].filter(v => v !== value);

    // if there are no more values on this attribute, delete the empty array
    if (filters[attribute].length === 0) {
      delete filters[attribute];
    }

    const options = this.state;
    const filterWhere = getFilterWhere(options, filters);
    this.setState({ filters, filterWhere, dimension: null });
  }

  render() {
    const { dataType, accounts, entity } = this.props;

    if (!accounts && !entity) {
      return <Spinner fillContainer />;
    }
    const Header = dataType === 'metric' ? MetricsHeader : EventsHeader;

    return (
      <div style={{ height: '100%', boxSizing: 'border-box' }}>
        <Header
          {...this.props}
          {...this.state}
          setAttribute={this._setAttribute}
          setFunction={this._setFunction}
          setEventType={this._setEventType}
        />
        <Filters
          {...this.props}
          {...this.state}
          removeFilter={this._removeFilter}
        />
        <Grid
          className={`primary-body-stack-item-grid ${
            Object.keys(this.state.filters).length > 0 ? 'has-filters' : ''
          }`}
        >
          <GridItem columnSpan={3} collapseGapAfter className="col-1">
            <DimensionPicker
              {...this.props}
              {...this.state}
              setDimension={this._setDimension}
            />
          </GridItem>
          <GridItem columnSpan={9} className="primary-chart-grid-item">
            <Chart {...this.props} {...this.state} />
            <FacetTable
              {...this.props}
              {...this.state}
              setFilter={this._setFilter}
            />
          </GridItem>
        </Grid>
      </div>
    );
  }
}

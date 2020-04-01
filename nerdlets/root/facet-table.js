import React from 'react';
import PropTypes from 'prop-types';
import { TableChart } from 'nr1';

import getMetricQuery from './get-query';

export default class FacetTable extends React.PureComponent {
  static propTypes = {
    account: PropTypes.object,
    setFilter: PropTypes.func,
    attribute: PropTypes.string,
    dimension: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      limit: '1000'
    };
  }

  render() {
    const { account, setFilter, attribute, dimension } = this.props;
    if (!attribute || !dimension) return <div />;

    const query = getMetricQuery(this.props, this.state);
    const onClickRow = (key, row) => {
      const value = row[key];

      setFilter(key, value);
    };

    return (
      <>
        <TableChart
          className="primary-table"
          fullWidth
          accountId={account.id}
          query={query}
          onClickTable={onClickRow}
        />
      </>
    );
  }
}

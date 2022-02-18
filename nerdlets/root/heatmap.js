import React from 'react';
import PropTypes from 'prop-types';
import { HeatmapChart } from 'nr1';

import getQuery from './get-query';

const Heatmap = props => {
  const { attribute, dimension, account } = props;
  if (!attribute || !dimension) return null;

  const query = getQuery(props, null);

  return (
    <HeatmapChart
      className="primary-chart"
      query={query}
      accountIds={[account.id]}
      fullWidth
      style={{ height: '300px' }}
    />
  );
};

Heatmap.propTypes = {
  account: PropTypes.object.isRequired,
  attribute: PropTypes.string,
  dimension: PropTypes.string
};

export default Heatmap;

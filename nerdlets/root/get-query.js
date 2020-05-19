import quote from '../lib/quote';
import { timeRangeToNrql } from '@newrelic/nr1-community';

export function getFilterWhere(props, filters) {
  const clauses = Object.keys(filters).map(attr => {
    const values = filters[attr];
    if (values.length === 1) {
      return `${quote(attr)} = '${values[0]}'`;
    } else {
      return `${quote(attr)} IN (${values.map(v => `'${v}'`).join(',')})`;
    }
  });

  const domain = props.entity && props.entity.domain;
  const isMetric = props.eventType === 'Metric';

  // eslint-disable-next-line prettier/prettier
  if (domain === 'INFRA' || domain === 'EXT' ||(domain === 'APM' && isMetric)) {
    clauses.push(`entity.guid = '${props.entity.guid}'`);
  } else if (domain === 'APM') {
    clauses.push(`entityGuid = '${props.entity.guid}'`);
  } else if (props.entity) {
    clauses.push(`appId = ${props.entity.applicationId}`);
  }
  if (clauses.length > 0) {
    return clauses.join(' AND ');
  } else {
    return null;
  }
}

export default function getQuery(props, state) {
  const {
    dimension,
    fn,
    attribute,
    filters,
    eventType,
    platformUrlState
  } = props;
  const { timeseries, limit } = state || {};
  const where = getFilterWhere(props, filters);

  // special case for  when the user selects "Count(*)" as the attribute to be plotted
  const select =
    attribute === '__count__' ? 'count(*)' : `${fn}(${quote(attribute)})`;

  let query = `SELECT ${select} FROM ${eventType} ${timeRangeToNrql(
    platformUrlState
  )}`;

  if (dimension) query = query.concat(` FACET ${quote(dimension)}`);
  if (limit) query = query.concat(` LIMIT ${limit}`);
  if (where) query = query.concat(` WHERE ${where}`);
  if (timeseries) query = query.concat(` TIMESERIES`);

  return query;
}

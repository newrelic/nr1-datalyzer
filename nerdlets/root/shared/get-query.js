import quote from '../../lib/quote';

export function getFilterWhere(filters) {
  const clauses = Object.keys(filters).
    map(attr => {
      const values = filters[attr]
      if (values.length == 1) {
        return `${quote(attr)} = '${values[0]}'`
      }
      else {
        return `${quote(attr)} IN (${values.map(v => `'${v}'`).join(',')})`
      }
    })

  if (clauses.length > 0) {
    return clauses.join(" AND ")
  }
  else {
    return null
  }
}

export default function getQuery(props, state) {
  const { dimension, fn, attribute, filters, eventType } = props;
  const { timeseries, limit } = state || {};
  const where = getFilterWhere(filters)

  // special case for  when the user selects "Count(*)" as the attribute to be plotted
  const select = attribute ==  "__count__" ? 'count(*)' : `${fn}(${quote(attribute)})`

  let query = `SELECT ${select} FROM ${eventType}`;

  if (dimension) query = query.concat(` FACET ${quote(dimension)}`);
  if (timeseries) query = query.concat(` TIMESERIES`);
  if (limit) query = query.concat(` LIMIT ${limit}`);
  if (where) query = query.concat(` WHERE ${where}`);

  console.log(query)
  return query;
}

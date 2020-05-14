const KEYWORDS = {
  begintime: true,
  endtime: true,
  timeseries: true,
  select: true,
  from: true,
  where: true,
  since: true,
  until: true,
  facet: true,
  limit: true,
  offset: true,
  id: true,
  order: true,
  by: true,
  nocache: true,
  end: true
};

export default function quote(s) {
  if (!s) return '';

  /* eslint-disable no-useless-escape */
  if (s.match(/[\s:-@#\!\\\/]/)) {
    return `\`${s}\``;
  }
  /* eslint-enable */

  if (KEYWORDS[s.toLowerCase()]) {
    return `\`${s}\``;
  }
  return s;
}

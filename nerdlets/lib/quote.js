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
  join: true,
  end: true
};

export default function quote(s) {
  let doQuote = false;
  if (!s) return '';

  /* eslint-disable no-useless-escape */
  if (s.match(/[\s:-@#\!\\\/]/)) {
    doQuote = true;
  }

  if (KEYWORDS[s.toLowerCase()]) {
    doQuote = true;
  }
  s.split(/[\.-]/).forEach(term => {
    term = term.toLowerCase();
    if (KEYWORDS[term]) {
      doQuote = true;
    }
  });
  /* eslint-enable */

  if (doQuote) return `\`${s}\``;
  else return s;
}

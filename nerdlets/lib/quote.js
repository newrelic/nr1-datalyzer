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
  by: true
}

export default function quote(s) {
  if(!s) return ''
  
  if (s.match(/[\.\s:-]/)) {
    return "`"+s+"`"
  }
  if(KEYWORDS[s.toLowerCase()]) {
    return "`"+s+"`"
  }
  return s
}

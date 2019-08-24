export default function quote(s) {
  if(!s) return ''
  
  if (s.match(/\./)) {
    return "`"+s+"`"
  }
  return s
}

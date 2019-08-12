export default function quote(s) {
  if (s.match(/\./)) {
    return "`"+s+"`"
  }
  return s
}

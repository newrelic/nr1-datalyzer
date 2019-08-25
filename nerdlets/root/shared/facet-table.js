import React from "react"
import {TableChart} from "nr1"

import getMetricQuery  from "./get-query";

export default class FacetTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      limit: "1000"
    }
  }

  render() {
    const {account, setFilter, metricName, dimension} = this.props
    if(!metricName || !dimension) return <div/>
    
    const query = getMetricQuery(this.props, this.state)
    const onClickRow = (key, row) => {      
      const value = row[key]

      setFilter(key, value)
    }

    return <div style={{height: "2000px"}}>
      <TableChart accountId={account.id} query={query} onClickTable={onClickRow} />
    </div>
  }
}
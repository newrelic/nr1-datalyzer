import React from "react"

import {NerdGraphQuery, List} from 'nr1'

async function nrdbQuery(accountId, query) {
  const gql = `{
    actor {
      account(id: ${accountId}) {
        nrql(query: "${query}") {
          results suggestedFacets {attributes}
        }
      }
    }
  }`

  return await NerdGraphQuery.query({query: gql})
}

function quote(s) {
  if (s.match(/\./)) {
    return "`"+s+"`"
  }
  return s
}

export default class FacetPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    const {account, eventType} = this.props
    let results = await nrdbQuery(account.id, `SELECT keySet() FROM ${quote(eventType.name)}`)
    const facetMap = {}
    const facets = []
    let {nrql} = results.data.actor.account

    const select = []
    
    nrql.results.forEach(facet => {
      facet.name = facet.key        
      facetMap[facet.key] = facet
      if(facet.type == "string") {
        facets.push(facet)
        select.push(`uniqueCount(${quote(facet.name)}), latest(${quote(facet.name)})`)
      }
    })

    nrql.suggestedFacets.forEach(attr => {
      const {attributes} = attr
      if(attributes.length == 1) {
        const facet = facetMap[attributes[0]]
        facet.isSuggested = true        
      }
    })

    results = await nrdbQuery(account.id, `SELECT ${select.join(", ")} FROM ${quote(eventType.name)}`)
    facets.forEach(facet => {
      const key = `uniqueCount.${facet.name}`
      facet.count = results.data.actor.account.nrql.results[0][key]      
    })
    
    this.setState({
      singleValueFacets: facets.filter(f => f.count == 1).sort(),
      suggestedFacets: facets.filter(f => f.isSuggested && f.count > 1).sort(),
      otherFacets: facets.filter(f => !f.isSuggested && f.count > 1).sort(),
    })
  }


  renderFacetGroup(title, facets) {
    return <>
      <li key={`group-${title}`}>
        <h4>{title}</h4>
      </li>
      {facets.map(facet => {
        return <li key={facet.key}>
          {facet.name} ({facet.count})
        </li>
      })}
    </>
  }

  render() {
    const {singleValueFacets, suggestedFacets, otherFacets} = this.state
    if(!singleValueFacets) return null

    console.log(this.state)
    
    return <ul>
      {this.renderFacetGroup("Suggested", suggestedFacets)}
      {this.renderFacetGroup("Other Facets", otherFacets)}
    </ul> 
    
  }
}
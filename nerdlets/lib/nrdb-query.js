import { NerdGraphQuery } from 'nr1';
import get from 'lodash.get';

export default async function nrdbQuery(accountId, nrql) {
  const gql = `{
    actor {
      account(id: ${accountId}) {
        nrql(query: "${nrql}") {
          results
        }
      }
    }
  }`;

  const { data, error } = await NerdGraphQuery.query({ query: gql });
  if (error) {
    throw new Error(`Bad NRQL Query: ${nrql}: ${error}`);
  }
  return get(data, 'actor.account.nrql.results');
}

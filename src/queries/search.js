export const search = `
	query($query: String!, $before: ID){
		search(query:$query, before: $before){
			location
			reputation
			_id
		}
	}
`

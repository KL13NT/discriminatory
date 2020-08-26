export const search = `
	query($query: String!){
		search(query:$query){
			content
			created
			location{
				location
				reputation
			}
			_id
			author{
				displayName
				avatar
				verified
				_id
			}
			comments{
				_id
				content
				author {
					displayName
					avatar
					verified
					_id
				}
			}
			reactions{
				upvotes
				downvotes
				reaction
			}
		}
	}
`

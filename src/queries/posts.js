export const react = `
	mutation ReactMutation ($post: ID!, $reaction: String!){
			react(post: $post, reaction: $reaction) {
				reaction
			}
	}`

export const comment = `
	mutation CommentMutation ($post: ID!, $content: String!){
			comment(post: $post, content: $content)
	}
`

export const feed = `
	query($before: ID){
		feed(before: $before){
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

export const explore = `
	query($before: ID){
		explore(before: $before){
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

export const search = `
	query($query: String!, $before: ID){
		search(query: $query, before: $before){
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
			reactions{
				upvotes
				downvotes
				reaction
			}
		}
	}
`

export const pin = `
	mutation PinMutation ($post: ID!){
			pin(post: $post)
	}
`

export const unpin = `
	mutation UnpinMutation ($post: ID!){
			unpin(post: $post)
	}
`

// export const report = `
// 	mutation ReportMutation ($post: ID!, reason: String!){
// 			report(post: $post, reason: $reason) {
// 				_id
// 			}
// 	}
// `

export const remove = `
	mutation RemoveMutation ($post: ID!){
			delete(post: $post)
	}
`

export const post = `
	mutation CreatePostMutation ($content: String!, $location: String!){
		post(content: $content,  location: $location)
	}
`

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
	query($limit: Int!, $before: ID){
		feed(limit: $limit, before: $before){
			content
			created
			location
			_id
			author{
				displayName
				_id
			}
			comments{
				_id
				content
				author {
					displayName
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

export const pin = `
	mutation PinMutation ($post: ID!){
			pin(post: $post) {
				_id
			}
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
			delete(post: $post) {
				_id
			}
	}
`

export const post = `
	mutation CreatePostMutation ($content: String!, $location: String!){
		post(content: $content,  location: $location){
			_id
		}
	}
`

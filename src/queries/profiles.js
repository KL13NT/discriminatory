export const accountQuery = `
	query{
		account{
			displayName
			avatar
			email
			location
			dateofbirth
			tagline
		}
	}
`

export const profile = `
	query($member: String!, $before: ID){
		profile(member:$member, before:$before){
			following

			user {
				displayName
				email
				location
				tagline
				avatar
				pinned
				_id
			}

			posts{
				location
				content
				created
				_id

				reactions{
					upvotes
					downvotes
					reaction
				}

				comments{
					content
					_id

					author{
						displayName
						email
						location
						tagline
						avatar
						pinned
					}
				}
			}
		}
	}
`

export const accountQuery = `
	query{
		account{
			displayName
			avatar
			email
			location
			dateofbirth
			verified
			tagline
			_id
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
				verified
				_id
			}

			posts{
				location
				content
				created
				pinned
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

export const follow = `
	mutation FollowMutation ($member: ID!){
			follow(member: $member){
				_id
			}
	}
`

export const unfollow = `
	mutation UnfollowMutation ($member: ID!){
		unfollow(member: $member){
			_id
		}
	}
`

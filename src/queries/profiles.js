export const accountQuery = `
	query{
		account{
			displayName
			avatar
			email
			location
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
			postCount

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
				location{
					location
					reputation
				}
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

export const updateProfile = `
	mutation AccountMutation ($displayName: String!, $location: String!, $tagline: String!){
			account (displayName: $displayName,  location: $location, tagline: $tagline) {
				displayName
				location
				email
				tagline
			}
	}`

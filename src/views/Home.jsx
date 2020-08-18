import React, { useEffect } from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import { useIntl } from 'react-intl'
import Composer from '../components/Composer/Composer'
import { useQuery } from 'urql'
import { useState } from 'react'
import Container from '../components/Container/Container'
import Post from '../components/Post/Post'
import { useAuth } from '../stores/auth'
import { Link } from 'react-router-dom'

const EmptyFeed = () => (
	<Container>
		<p>
			Oh no, your feed is empty! <Link to='/explore'>Explore</Link> to find
			people and engage with the community.
		</p>
	</Container>
)

const PostList = ({ feed }) => {
	if (feed)
		return feed.length === 0 ? (
			<EmptyFeed />
		) : (
			feed.map(post => <Post key={post._id} {...post} />)
		)
	return null
}

function Home() {
	const { formatMessage: f } = useIntl()
	const [pagination] = useState({
		limit: 20,
		before: null
	})
	const { user } = useAuth()

	const [res] = useQuery({
		query: `
			query($limit: Int!, $before: ID){
				feed(limit: $limit, before: $before){
					content
					_id
					author{
						displayName
						_id
					}
					comments{
						_id
						content
					}
					reactions{
					upvotes,
						downvotes
					}
				}
			}
		`,
		variables: {
			...pagination
		},
		pause: !user
	})

	console.log(res)

	useEffect(() => {
		console.log('HOME QUERY', res, user)
	}, [res, user])

	return (
		<>
			<PageTitle>{f({ id: 'home.title' })}</PageTitle>
			<Composer />
			{res.data ? <PostList feed={res.data.feed} /> : null}
		</>
	)
}

export default Home

import React, { useEffect, useCallback } from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import { useIntl } from 'react-intl'
import Composer from '../components/Composer/Composer'
import { useQuery, useMutation } from 'urql'
import { useState } from 'react'
import Container from '../components/Container/Container'
import Post from '../components/Post/Post'
import { useAuth } from '../stores/auth'
import { Link } from 'react-router-dom'

import * as queries from '../queries/posts'
import { useToasts } from '../components/Toast/Toast'
import { useProfile } from '../stores/profile'

const EmptyFeed = () => (
	<Container>
		<p>
			Oh no, your feed is empty! <Link to='/explore'>Explore</Link> to find
			people and engage with the community.
		</p>
	</Container>
)

const PostList = ({ feed, ...props }) => {
	if (feed)
		return feed.length === 0 ? (
			<EmptyFeed />
		) : (
			feed.map(post => <Post key={post._id} {...post} {...props} />)
		)
	return null
}

function Home() {
	const { add } = useToasts()
	const { profile } = useProfile()
	const { formatMessage: f } = useIntl()
	const [pagination] = useState({
		limit: 20,
		before: null
	})
	const [shouldRefetch, setShouldRefetch] = useState(true)
	const { user } = useAuth()

	const [postRes, post] = useMutation(queries.post)
	const [reactionRes, react] = useMutation(queries.react)
	const [commentRes, comment] = useMutation(queries.comment)
	const [pinRes, pin] = useMutation(queries.pin)
	const [reportRes, report] = useMutation(queries.report)
	const [removeRes, remove] = useMutation(queries.remove)
	const [feedRes, reFeed] = useQuery({
		query: queries.feed,
		variables: {
			...pagination
		},
		pause: !user || !shouldRefetch
	})

	const error = useCallback(
		() => add({ text: f({ id: 'errors.general', type: 'danger' }) }),
		[] // eslint-disable-line
	)

	useEffect(() => {
		if (feedRes.data) setShouldRefetch(false)
	}, [feedRes])

	useEffect(() => postRes.error && error(), [postRes, error])
	useEffect(() => reactionRes.error && error(), [reactionRes, error])
	useEffect(() => commentRes.error && error(), [commentRes, error])
	useEffect(() => pinRes.error && error(), [pinRes, error])
	useEffect(() => reportRes.error && error(), [reportRes, error])
	useEffect(() => removeRes.error && error(), [removeRes, error])

	const onCompose = (content, location) => {
		post({ content, location })
		reFeed()
	}

	const onReact = (post, reaction) => {
		react({ post, reaction })
	}

	const onComment = (post, content) => {
		comment({ post, content })
	}

	const onPin = (post, content) => {
		pin({ post, content })
	}

	const onReport = (post, content) => {
		report({ post, content })
	}

	const onDelete = (post, content) => {
		remove({ post, content })
	}

	return (
		<>
			<PageTitle>{f({ id: 'home.title' })}</PageTitle>
			<Composer
				{...profile}
				verified={user.email_verified}
				onSubmit={onCompose}
			/>
			{feedRes.data ? (
				<PostList
					onReact={onReact}
					onComment={onComment}
					onPin={onPin}
					onReport={onReport}
					onDelete={onDelete}
					feed={feedRes.data.feed}
					user={user}
					profile={profile}
				/>
			) : null}
		</>
	)
}

export default Home

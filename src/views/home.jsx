import React, { useEffect, useCallback } from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import PostMaster from './components/PostMaster'
import Composer from '../components/Composer/Composer'

import { useIntl } from 'react-intl'
import { useQuery, useMutation } from 'urql'
import { useState } from 'react'
import { useAuth } from '../stores/auth'

import { useToasts } from '../components/Toast/Toast'
import { useProfile } from '../stores/profile'

import * as queries from '../queries/posts'
import { usePosts } from '../stores/posts'
import { Spinner } from '../components/Loading/LoadingPage'

function Home() {
	const { add } = useToasts()
	const { profile } = useProfile()
	const { formatMessage: f } = useIntl()
	const { user } = useAuth()

	const { posts, setPosts } = usePosts(state => ({
		posts: state.home,
		setPosts: state.setHome
	}))
	const [pagination] = useState({
		before: null
	})

	const [postRes, post] = useMutation(queries.post)
	const [feedRes, reFeed] = useQuery({
		query: queries.feed,
		variables: {
			...pagination
		},
		pause: !user,
		requestPolicy: 'network-only'
	})

	const error = useCallback(
		() => add({ text: f({ id: 'errors.general' }), type: 'danger' }),
		[] // eslint-disable-line
	)

	useEffect(() => {
		if (feedRes.data) setPosts([...feedRes.data.feed])
	}, [feedRes])

	useEffect(() => postRes.error && error(), [postRes, error])

	const onCompose = newPost => {
		post(newPost).then(response => {
			if (!response.error) reFeed({ requestPolicy: 'network-only' })
		})
	}

	return (
		<>
			<PageTitle>{f({ id: 'home.title' })}</PageTitle>
			<Composer
				{...profile}
				verified={user.email_verified}
				onSubmit={onCompose}
			/>
			{feedRes.fetching ? <Spinner /> : null}
			<PostMaster feedRes={feedRes} posts={posts} setPosts={setPosts} />
		</>
	)
}

export default Home

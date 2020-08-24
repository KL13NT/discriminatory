import React, { useEffect, useCallback } from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import PostMaster from './components/PostMaster'

import { useQuery } from 'urql'
import { useIntl } from 'react-intl'
import { useState } from 'react'
import { useAuth } from '../stores/auth'
import { useToasts } from '../components/Toast/Toast'
import { usePosts } from '../stores/posts'
import { Spinner } from '../components/Loading/LoadingPage'

import * as queries from '../queries/posts'

function Discriminators() {
	const { add } = useToasts()
	const { formatMessage: f } = useIntl()
	const { user } = useAuth()

	const { posts, setPosts } = usePosts(state => ({
		posts: state.home,
		setPosts: state.setHome
	}))
	const [pagination] = useState({
		before: null
	})

	const [discriminators, reload] = useQuery({
		query: queries.discriminators,
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
		if (discriminators.data) setPosts([...discriminators.data.discriminators])
	}, [discriminators, setPosts])

	useEffect(() => discriminators.error && error(), [discriminators, error])

	return (
		<>
			<PageTitle>{f({ id: 'titles.home' })}</PageTitle>
			{discriminators.fetching ? <Spinner /> : null}
			<PostMaster feedRes={discriminators} posts={posts} setPosts={setPosts} />
		</>
	)
}

export default Discriminators

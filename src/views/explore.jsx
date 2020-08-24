import React, { useEffect, useCallback } from 'react'

import PageTitle from '../components/PageTitle/PageTitle'
import PostMaster from './components/PostMaster'

import { useIntl } from 'react-intl'
import { useQuery } from 'urql'
import { useState } from 'react'

import * as queries from '../queries/posts'
import { Spinner } from '../components/Loading/LoadingPage'

function Explore() {
	const { formatMessage: f } = useIntl()
	const [posts, setPosts] = useState([])

	const [pagination, setPagination] = useState({ before: null })
	const [latestRes, reLatest] = useQuery({
		query: queries.explore,
		variables: {
			...pagination
		},
		requestPolicy: 'network-only'
	})

	useEffect(() => {
		if (latestRes.data) setPosts([...posts, ...latestRes.data.explore])
	}, [latestRes])

	const onScroll = useCallback(() => {
		if (
			window.scrollY + window.innerHeight > document.body.clientHeight - 100 &&
			!latestRes.fetching &&
			latestRes.data.explore.length > 0
		) {
			setPagination({ before: posts[posts.length - 1]._id })
		}
	}, [latestRes, posts])

	useEffect(() => {
		window.addEventListener('scroll', onScroll)

		return () => window.removeEventListener('scroll', onScroll)
	}, [latestRes, onScroll])

	if (!latestRes.data) return <Spinner />
	return (
		<>
			<PageTitle>{f({ id: 'titles.explore' })}</PageTitle>

			<PostMaster
				feedRes={latestRes}
				reFeed={reLatest}
				posts={posts}
				feedResPosts={latestRes.data.explore}
				setPosts={setPosts}
			/>
		</>
	)
}

export default Explore

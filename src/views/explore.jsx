import React, { useEffect, useCallback } from 'react'

import PageTitle from '../components/PageTitle/PageTitle'
import PostMaster from './components/PostMaster'

import { useIntl, FormattedMessage } from 'react-intl'
import { useQuery } from 'urql'
import { useState } from 'react'

import * as queries from '../queries/posts'
import { Spinner } from '../components/Loading/LoadingPage'
import { PageState } from '../components/Errors/PageError'
import { getApolloErrorCode, isNearBottom } from '../utils/general'
import LocaleSEO from './components/SEO'
import { usePosts } from '../stores/posts'

const NoPosts = () => {
	const Description = <FormattedMessage id='states.emptyexplore.description' />
	const Title = <FormattedMessage id='states.emptyexplore.title' />

	return <PageState title={Title} subtitle={Description} />
}

const EndOfFeed = () => {
	const Description = <FormattedMessage id='states.feedend.description' />
	const Title = <FormattedMessage id='states.feedend.title' />

	return <PageState title={Title} subtitle={Description} />
}

const State = ({ posts, resPosts }) => {
	if (posts.length === 0 && resPosts.length === 0) return <NoPosts />
	if (posts.length > 0 && resPosts.length === 0) return <EndOfFeed />
	return null
}

//REFACTORME: move pagestates from explore and home to separate components

function Explore() {
	const { formatMessage: f } = useIntl()
	const [posts, setPosts] = usePosts(state => [state.explore, state.setExplore])

	const [pagination, setPagination] = useState({ before: null, reload: false })
	const [latestRes] = useQuery({
		query: queries.explore,
		variables: {
			before: pagination.before
		},
		pause: !pagination.reload,
		pollInterval: 5 * 60 * 1000 /* 5 minutes */,
		requestPolicy: 'cache-first'
	})

	const resPosts = latestRes.data ? latestRes.data.explore : []

	useEffect(() => {
		if (posts.length === 0) setPagination({ ...pagination, reload: true })
	}, [])

	useEffect(() => {
		if (latestRes.data) {
			setPagination({ ...pagination, reload: false })
			setPosts([...posts, ...resPosts])
		}
	}, [latestRes.data])

	const onScroll = useCallback(() => {
		if (isNearBottom() && !latestRes.fetching && resPosts.length)
			setPagination({ before: posts[posts.length - 1]._id, reload: true })
	}, [latestRes, posts])

	useEffect(() => {
		window.addEventListener('scroll', onScroll)

		return () => window.removeEventListener('scroll', onScroll)
	}, [latestRes, onScroll])

	if (latestRes.error)
		return <PageState code={getApolloErrorCode(latestRes.error)} />
	if (!latestRes.data) return <Spinner />
	return (
		<>
			<LocaleSEO
				title='titles.explore'
				description='titles.explore.description'
				path='/explore'
			/>

			<PageTitle>{f({ id: 'titles.explore' })}</PageTitle>

			<PostMaster posts={posts} setPosts={setPosts} />

			{latestRes.fetching ? <Spinner /> : null}
			<State posts={posts} resPosts={resPosts} />
		</>
	)
}

export default Explore

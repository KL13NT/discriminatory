import React, { useEffect, useCallback } from 'react'

import PageTitle from '../components/PageTitle/PageTitle'
import PostMaster from './components/PostMaster'

import { useIntl, FormattedMessage } from 'react-intl'
import { useQuery } from 'urql'
import { useState } from 'react'

import * as queries from '../queries/posts'
import { Spinner } from '../components/Loading/LoadingPage'
import { PageState } from '../components/Errors/PageError'
import { getApolloErrorCode } from '../utils/general'
import LocaleSEO from './components/SEO'

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

function Explore() {
	const { formatMessage: f } = useIntl()
	const [posts, setPosts] = useState([])

	const [pagination, setPagination] = useState({ before: null })
	const [latestRes, reLatest] = useQuery({
		query: queries.explore,
		variables: {
			...pagination
		},
		pollInterval: 5 * 60 * 1000 /* 5 minutes */,
		requestPolicy: 'cache-first'
	})

	useEffect(() => {
		if (latestRes.data) setPosts([...posts, ...latestRes.data.explore])
	}, [latestRes.data])

	const onScroll = useCallback(() => {
		if (
			window.scrollY + window.innerHeight > document.body.clientHeight - 100 &&
			!latestRes.fetching &&
			latestRes.data &&
			latestRes.data.explore.length > 0
		) {
			setPagination({ before: posts[posts.length - 1]._id })
		}
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

			<PostMaster
				feedRes={latestRes}
				reFeed={reLatest}
				posts={posts}
				feedResPosts={latestRes.data.explore}
				setPosts={setPosts}
			/>

			{latestRes.fetching ? <Spinner /> : null}
			<State posts={posts} resPosts={latestRes.data.explore} />
		</>
	)
}

export default Explore

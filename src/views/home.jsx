import React, { useEffect, useCallback } from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import PostMaster from './components/PostMaster'
import Composer from '../components/Composer/Composer'
import LocaleSEO from './components/SEO'

import { useIntl, FormattedMessage } from 'react-intl'
import { useQuery } from 'urql'
import { useState } from 'react'
import { useAuth } from '../stores/auth'

import { useProfile } from '../stores/profile'

import { usePosts } from '../stores/posts'
import { Spinner } from '../components/Loading/LoadingPage'
import { Link } from 'react-router-dom'
import { PageState } from '../components/Errors/PageError'
import { getApolloErrorCode, isNearBottom } from '../utils/general'

import * as queries from '../queries/posts'

const NoPosts = () => {
	const Description = (
		<FormattedMessage
			id='states.emptyfeed.description'
			values={{
				// eslint-disable-next-line react/display-name
				explore: chunks => <Link to='/explore'>{chunks}</Link>
			}}
		/>
	)
	const Title = <FormattedMessage id='states.emptyfeed.title' />

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

function Home() {
	const { profile } = useProfile()
	const { formatMessage: f } = useIntl()
	const { user } = useAuth()

	const [pagination, setPagination] = useState({ before: null, reload: false })
	const [posts, setPosts] = usePosts(state => [state.home, state.setHome])

	const [feedRes, reFeed] = useQuery({
		query: queries.feed,
		variables: {
			before: pagination.before
		},
		pause: !user || !pagination.reload,
		pollInterval: 5 * 60 * 1000 /* 5 minutes */,
		requestPolicy: 'cache-first'
	})

	const resPosts = feedRes.data ? feedRes.data.feed : []

	useEffect(() => {
		if (posts.length === 0) setPagination({ ...pagination, reload: true })
	}, [])

	useEffect(() => {
		if (feedRes.data) {
			setPagination({ ...pagination, reload: false })
			setPosts([...posts, ...resPosts])
		}
	}, [feedRes.data])

	const onSuccess = () => {
		//REFACTORME: create a function that creates posts client-side and prepend to posts instead of fetching
		reFeed({ requestPolicy: 'network-only' })
	}

	const onScroll = useCallback(() => {
		if (isNearBottom() && !feedRes.fetching && resPosts.length)
			setPagination({ before: posts[posts.length - 1]._id, reload: true })
	}, [feedRes, posts])

	useEffect(() => {
		window.addEventListener('scroll', onScroll)

		return () => window.removeEventListener('scroll', onScroll)
	}, [feedRes, onScroll])

	if (feedRes.error)
		return <PageState code={getApolloErrorCode(feedRes.error)} />
	if (!posts.length === 0) return <Spinner />
	return (
		<>
			<LocaleSEO
				title='titles.home'
				description='titles.home.description'
				path='/home'
			/>

			<PageTitle>{f({ id: 'titles.home' })}</PageTitle>

			<Composer
				avatar={profile.avatar}
				verified={user.email_verified}
				onSuccess={onSuccess}
			/>

			<PostMaster posts={posts} setPosts={setPosts} />

			{feedRes.fetching ? <Spinner /> : null}
			<State posts={posts} resPosts={resPosts} />
		</>
	)
}

export default Home

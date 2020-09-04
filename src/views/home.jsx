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
import { getApolloErrorCode } from '../utils/general'

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

	const { posts, setPosts } = usePosts(state => ({
		posts: state.home,
		setPosts: state.setHome
	}))

	const [pagination, setPagination] = useState({ before: null })
	const [feedRes, reFeed] = useQuery({
		query: queries.feed,
		variables: {
			...pagination
		},
		pause: !user,
		pollInterval: 5 * 60 * 1000 /* 5 minutes */,
		requestPolicy: 'cache-first'
	})

	useEffect(() => {
		if (feedRes.data) setPosts([...posts, ...feedRes.data.feed])
	}, [feedRes.data])

	const onSuccess = () => {
		reFeed({ requestPolicy: 'network-only' })
	}

	const onScroll = useCallback(() => {
		if (
			window.scrollY + window.innerHeight > document.body.clientHeight - 100 &&
			!feedRes.fetching &&
			feedRes.data.feed.length > 0
		) {
			setPagination({ before: posts[posts.length - 1]._id })
		}
	}, [feedRes, posts])

	useEffect(() => {
		window.addEventListener('scroll', onScroll)

		return () => window.removeEventListener('scroll', onScroll)
	}, [feedRes, onScroll])

	if (feedRes.error)
		return <PageState code={getApolloErrorCode(feedRes.error)} />
	if (!feedRes.data) return <Spinner />
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

			<PostMaster
				reFeed={reFeed}
				feedResPosts={feedRes.data.feed}
				posts={posts}
				setPosts={setPosts}
			/>

			{feedRes.fetching ? <Spinner /> : null}
			<State posts={posts} resPosts={feedRes.data.feed} />
		</>
	)
}

export default Home

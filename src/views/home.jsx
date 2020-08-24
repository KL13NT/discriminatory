import React, { useEffect, useCallback } from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import PostMaster from './components/PostMaster'
import Composer from '../components/Composer/Composer'

import { useIntl } from 'react-intl'
import { useQuery } from 'urql'
import { useState } from 'react'
import { useAuth } from '../stores/auth'

import { useProfile } from '../stores/profile'

import * as queries from '../queries/posts'
import { usePosts } from '../stores/posts'
import { Spinner } from '../components/Loading/LoadingPage'

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
		requestPolicy: 'network-only'
	})

	useEffect(() => {
		if (feedRes.data) setPosts([...posts, ...feedRes.data.feed])
	}, [feedRes])

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

	if (!feedRes.data) return <Spinner />
	return (
		<>
			<PageTitle>{f({ id: 'titles.home' })}</PageTitle>
			<Composer
				avatar={profile.avatar}
				verified={user.email_verified}
				onSuccess={onSuccess}
			/>
			<PostMaster
				feedRes={feedRes}
				reFeed={reFeed}
				feedResPosts={feedRes.data.feed}
				posts={posts}
				setPosts={setPosts}
			/>
			{feedRes.fetching ? <Spinner /> : null}
		</>
	)
}

export default Home

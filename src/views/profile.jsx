import React, { useEffect, useCallback } from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import Container from '../components/Container/Container'
import PostMaster from './components/PostMaster'
import { ProfileHeader } from '../components/ProfileHeader/ProfileHeader'

import { useIntl } from 'react-intl'
import { useQuery } from 'urql'
import { useState } from 'react'
import { useAuth } from '../stores/auth'
import { useLocation } from 'react-router-dom'
import { useToasts } from '../components/Toast/Toast'
import { useFullscreenLoader } from '../stores/loading'

import * as queries from '../queries/profiles'

const Four0Four = () => (
	<Container>
		<p>This profile doesn't exist.</p>
	</Container>
)

function Profile() {
	const { add } = useToasts()
	const { user } = useAuth()
	const { load, finish } = useFullscreenLoader()
	const { pathname } = useLocation()
	const { formatMessage: f } = useIntl()

	const [posts, setPosts] = useState([])
	const [pagination] = useState({
		before: null
	})

	const [profileRes, reProfile] = useQuery({
		query: queries.profile,
		variables: {
			...pagination,
			member: pathname.replace('/', '')
		},
		pause: !user,
		requestPolicy: 'network-only'
	})

	const error = useCallback(
		() => add({ text: f({ id: 'errors.general' }), type: 'danger' }),
		[] // eslint-disable-line
	)

	useEffect(() => {
		if (profileRes.data)
			setPosts(
				profileRes.data.profile.posts.map(post => ({
					...post,
					author: profileRes.data.profile.user
				}))
			)
	}, [profileRes])

	useEffect(() => profileRes.error && error(), [profileRes, error])

	if (!profileRes.data) return null
	return (
		<>
			<PageTitle>{f({ id: 'Profile.title' })}</PageTitle>
			<ProfileHeader {...profileRes.data} />
			{posts.length === 0 ? (
				<Container>This user doesn't have any posts.</Container>
			) : (
				<PostMaster feedRes={profileRes} posts={posts} setPosts={setPosts} />
			)}
		</>
	)
}

export default Profile

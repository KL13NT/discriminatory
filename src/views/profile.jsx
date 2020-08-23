import React, { useEffect, useCallback } from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import Container from '../components/Container/Container'
import PostMaster from './components/PostMaster'
import { ProfileHeader } from '../components/ProfileHeader/ProfileHeader'

import {
	useIntl,
	FormattedPlural,
	FormattedNumber,
	FormattedMessage
} from 'react-intl'
import { useQuery, useMutation } from 'urql'
import { useState } from 'react'
import { useAuth } from '../stores/auth'
import { useLocation } from 'react-router-dom'
import { useToasts } from '../components/Toast/Toast'

import * as queries from '../queries/profiles'
import { Spinner } from '../components/Loading/LoadingPage'

const Four0Four = () => (
	<Container>
		<p>This profile doesn't exist.</p>
	</Container>
)

const IntlPlural = ({ value, localeContainId }) => {
	const { formatMessage: f } = useIntl()

	const zero = `${localeContainId}.zero`
	const one = `${localeContainId}.one`
	const few = `${localeContainId}.few`
	const many = `${localeContainId}.many`

	return (
		<>
			{value === 0 ? (
				<FormattedMessage id='numbers.zero' />
			) : (
				<FormattedNumber value={value} />
			)}{' '}
			<FormattedPlural
				value={value}
				zero={f({ id: zero })}
				one={f({ id: one })}
				few={f({ id: few })}
				many={f({ id: many })}
			/>
		</>
	)
}

function Profile() {
	const { add } = useToasts()
	const { user } = useAuth()
	const { pathname } = useLocation()
	const { formatMessage: f } = useIntl()

	const [profile, setProfile] = useState(null)
	const [pagination] = useState({
		before: null
	})

	const [followRes, follow] = useMutation(queries.follow)
	const [unfollowRes, unfollow] = useMutation(queries.unfollow)
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

	useEffect(() => followRes.error && console.log(followRes.error) && error(), [
		followRes,
		error
	])
	useEffect(
		() => unfollowRes.error && console.log(unfollowRes.error) && error(),
		[unfollowRes, error]
	)
	useEffect(
		() => profileRes.error && console.log(profileRes.error) && error(),
		[profileRes, error]
	)

	useEffect(() => {
		if (profileRes.data)
			setProfile({
				...profileRes.data.profile,
				posts: profileRes.data.profile.posts.map(post => ({
					...post,
					author: profileRes.data.profile.user
				}))
			})
	}, [profileRes])

	const onFollow = () => {
		const { _id } = profileRes.data.profile.user

		follow({ member: _id }).then(response => {
			if (!response.error) {
				add({
					text: f({ id: 'actions.followprofile.success' }),
					type: 'success'
				})
				setProfile({ ...profile, following: true })
			}
		})
	}

	//TODO: create a profiles store

	const onUnfollow = () => {
		const { _id } = profileRes.data.profile.user

		unfollow({ member: _id }).then(response => {
			if (!response.error) {
				add({
					text: f({ id: 'actions.unfollowprofile.success' }),
					type: 'success'
				})
				setProfile({ ...profile, following: false })
			}
		})
	}

	const setPosts = posts => {
		setProfile({ ...profile, posts })
	}

	if (!profile || profileRes.fetching) return <Spinner />

	return (
		<>
			<PageTitle
				tick={
					<IntlPlural
						value={profile.posts.length}
						localeContainId='plurals.post'
					/>
				}
			>
				{profile.user.displayName}
			</PageTitle>
			<ProfileHeader
				profile={profile}
				onFollow={onFollow}
				onUnfollow={onUnfollow}
			/>
			{profile.posts.length === 0 ? (
				<Container>This user doesn't have any posts.</Container>
			) : (
				<PostMaster
					feedRes={profileRes}
					posts={profile.posts}
					setPosts={setPosts}
				/>
			)}
		</>
	)
}

export default Profile

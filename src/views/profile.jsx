import React, { useEffect, useCallback } from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import Container from '../components/Container/Container'
import PostMaster from './components/PostMaster'
import { ProfileHeader } from '../components/ProfileHeader/ProfileHeader'

import { Spinner } from '../components/Loading/LoadingPage'
import {
	useIntl,
	FormattedPlural,
	FormattedNumber,
	FormattedMessage
} from 'react-intl'

import { useQuery, useMutation } from 'urql'
import { useState } from 'react'
import { useAuth } from '../stores/auth'
import { useParams } from 'react-router-dom'
import { useToasts } from '../components/Toast/Toast'

import * as queries from '../queries/profiles'
import { IntlPlural } from './components/Plural'

const Four0Four = () => (
	<Container>
		<p>
			<FormattedMessage id='errors.profile.404' />
		</p>
	</Container>
)

function Profile() {
	const { add } = useToasts()
	const { user } = useAuth()
	const { user_id } = useParams()
	const { formatMessage: f } = useIntl()

	const [profile, setProfile] = useState(null)
	const posts = profile ? profile.posts : []

	const [followRes, follow] = useMutation(queries.follow)
	const [unfollowRes, unfollow] = useMutation(queries.unfollow)

	const [pagination, setPagination] = useState({ before: null })
	const [profileRes, reProfile] = useQuery({
		query: queries.profile,
		variables: {
			...pagination,
			member: user_id
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

	useEffect(() => {
		if (!profileRes.error && profileRes.data) {
			if (pagination.before) {
				if (profileRes.data.profile.posts.length > 0)
					setProfile({
						...profile,
						posts: [
							...posts,
							...profileRes.data.profile.posts.map(post => ({
								...post,
								author: profileRes.data.profile.user
							}))
						]
					})
			} else {
				const { profile } = profileRes.data
				setProfile({
					...profile,
					posts: [
						...posts,
						...profile.posts.map(post => ({
							...post,
							author: profile.user
						}))
					]
				})
			}
		}
	}, [profileRes])

	const onScroll = useCallback(() => {
		if (
			window.scrollY + window.innerHeight > document.body.clientHeight - 100 &&
			!profileRes.fetching &&
			profileRes.data.profile.posts.length > 0
		) {
			setPagination({ before: profile.posts[profile.posts.length - 1]._id })
		}
	}, [profileRes, posts])

	useEffect(() => {
		window.addEventListener('scroll', onScroll)

		return () => window.removeEventListener('scroll', onScroll)
	}, [profileRes, onScroll])

	if (profileRes.error) return <Four0Four />
	if (!profile) return <Spinner />
	return (
		<>
			<PageTitle
				tick={
					<IntlPlural
						value={profile.postCount}
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
			{posts.length === 0 ? (
				<Container>
					<FormattedMessage id='errors.profile.noposts' />
				</Container>
			) : (
				<PostMaster
					feedRes={profileRes}
					reFeed={reProfile}
					feedResPosts={profileRes.data.profile.posts}
					posts={profile.posts}
				/>
			)}
		</>
	)
}

export default Profile

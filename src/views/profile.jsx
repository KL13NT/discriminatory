import React, { useEffect, useCallback } from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import PostMaster from './components/PostMaster'
import { ProfileHeader } from '../components/ProfileHeader/ProfileHeader'

import { Spinner } from '../components/Loading/LoadingPage'
import { useIntl, FormattedMessage } from 'react-intl'

import { useQuery, useMutation } from 'urql'
import { useState } from 'react'
import { useAuth } from '../stores/auth'
import { useParams } from 'react-router-dom'
import { useToasts } from '../components/Toast/Toast'

import * as queries from '../queries/profiles'
import { IntlPlural } from './components/Plural'
import { PageState } from '../components/Errors/PageError'
import { getApolloErrorCode } from '../utils/general'
import SEO from './components/SEO'

const NoPosts = () => {
	const Description = <FormattedMessage id='states.emptyprofile.description' />
	const Title = <FormattedMessage id='states.emptyprofile.title' />

	return <PageState title={Title} subtitle={Description} />
}

const EndOfFeed = () => {
	const Description = <FormattedMessage id='states.profileend.description' />
	const Title = <FormattedMessage id='states.profileend.title' />

	return <PageState title={Title} subtitle={Description} />
}

const State = ({ posts, resPosts }) => {
	if (posts.length === 0 && resPosts.length === 0) return <NoPosts />
	if (posts.length > 0 && resPosts.length === 0) return <EndOfFeed />
	return null
}

const ProfileError = ({ error }) => {
	const { formatMessage: f } = useIntl()
	const code = getApolloErrorCode(error)

	if (code === 'NOT_FOUND')
		return (
			<PageState
				code={code}
				title={f({ id: 'states.noprofile.title' })}
				subtitle={f({ id: 'states.noprofile.description' })}
			/>
		)

	return <PageState code={code} />
}

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
	const [profileRes] = useQuery({
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
	}, [profileRes.data])

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

	if (profileRes.error) return <ProfileError error={profileRes.error} />
	if (!profile) return <Spinner />
	return (
		<>
			<SEO
				title={profile.user.displayName}
				description={profile.user.tagline}
				path={`/${profile.user._id}`}
			/>

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

			<PostMaster
				feedRes={profileRes}
				setPosts={posts => setProfile({ ...profile, posts })}
				feedResPosts={profileRes.data.profile.posts}
				posts={profile.posts}
			/>

			{profileRes.fetching ? <Spinner /> : null}
			<State posts={posts} resPosts={profileRes.data.profile.posts} />
		</>
	)
}

export default Profile

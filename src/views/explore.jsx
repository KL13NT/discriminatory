import React, { useEffect, useCallback } from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import Container from '../components/Container/Container'
import Post from '../components/Post/Post'

import { useIntl } from 'react-intl'
import { useQuery, useMutation } from 'urql'
import { useState } from 'react'
import { useAuth } from '../stores/auth'

import { useToasts } from '../components/Toast/Toast'
import { useProfile } from '../stores/profile'

import * as queries from '../queries/posts'

const EmptyFeed = () => (
	<Container>
		<p>Oh no, there are no posts! This is awkward. Wanna play some chess?</p>
	</Container>
)

const PostList = ({ feed, ...props }) => {
	if (feed)
		return feed.length === 0 ? (
			<EmptyFeed />
		) : (
			feed.map(post => <Post key={post._id} {...post} {...props} />)
		)
	return null
}

function Explore() {
	const { add } = useToasts()
	const { profile } = useProfile()
	const { formatMessage: f } = useIntl()
	const [pagination] = useState({
		before: null
	})
	const [posts, setPosts] = useState([])
	const { user } = useAuth()

	const [reactionRes, react] = useMutation(queries.react)
	const [commentRes, comment] = useMutation(queries.comment)
	const [pinRes, pin] = useMutation(queries.pin)
	const [removeRes, remove] = useMutation(queries.remove)

	const [latestRes, reLatest] = useQuery({
		query: queries.explore,
		variables: {
			...pagination
		}
	})

	const error = useCallback(
		() => add({ text: f({ id: 'errors.general' }), type: 'danger' }),
		[] // eslint-disable-line
	)

	useEffect(() => {
		if (latestRes.data) setPosts([...latestRes.data.explore])
	}, [latestRes])

	useEffect(() => reactionRes.error && error(), [reactionRes, error])
	useEffect(() => commentRes.error && error(), [commentRes, error])
	useEffect(() => pinRes.error && error(), [pinRes, error])
	// useEffect(() => reportRes.error && error(), [reportRes, error])
	useEffect(() => removeRes.error && error(), [removeRes, error])

	const onUpvote = ({ currentTarget }) => {
		const { id } = currentTarget.parentNode.parentNode.parentNode.dataset

		onReact(id, 'UPVOTE')
	}

	const onDownvote = ({ currentTarget }) => {
		const { id } = currentTarget.parentNode.parentNode.parentNode.dataset

		onReact(id, 'DOWNVOTE')
	}

	const onReact = (post, reaction) => {
		react({ post, reaction }).then(response => {
			if (!response.error) {
				const index = posts.findIndex(p => p._id === post)
				const dupe = [...posts]
				const ref = dupe[index]
				const old = ref.reactions.reaction

				const updated = {
					...ref.reactions,
					reaction: old === reaction ? null : reaction
				}

				if (old === reaction) updated[`${reaction.toLowerCase()}s`] -= 1
				else {
					// add 1 to specified reaction
					updated[`${reaction.toLowerCase()}s`] += 1

					// remove old reaction if there is one
					if (old) updated[`${old.toLowerCase()}s`] -= 1
				}

				ref.reactions = updated

				setPosts(dupe)
			}
		})
	}

	const onComment = e => {
		e.preventDefault()
		const { currentTarget } = e
		const { id: post } = currentTarget.parentNode.dataset
		const { value: content } = currentTarget.elements['content']

		comment({ post, content }).then(response => {
			if (!response.error) {
				const index = posts.findIndex(p => p._id === post)
				const dupe = [...posts]
				const ref = dupe[index]
				const author = profile

				const comment = {
					content,
					author,
					_id: response.data
				}

				ref.comments.push(comment)

				setPosts([...dupe])
				add({ text: f({ id: 'post.comment.success' }), type: 'success' })

				currentTarget.elements['content'].value = ''
			}
		})
	}

	const onPin = ({ currentTarget }) => {
		const { id } = currentTarget.parentNode.parentNode.parentNode.dataset

		pin({ post: id }).then(response => {
			if (!response.error)
				add({ text: f({ id: 'post.pin.success' }), type: 'success' })
		})
	}

	const onDelete = ({ currentTarget }) => {
		const { id } = currentTarget.parentNode.parentNode.parentNode.dataset

		remove({ post: id }).then(response => {
			if (!response.error) {
				setPosts(posts.filter(p => p._id !== id))
				add({ text: f({ id: 'post.remove.success' }), type: 'success' })
			}
		})
	}

	return (
		<>
			<PageTitle>{f({ id: 'explore.title' })}</PageTitle>
			{latestRes.data ? (
				<PostList
					onComment={onComment}
					onPin={onPin}
					// onReport={onReport}
					onDelete={onDelete}
					onUpvote={onUpvote}
					onDownvote={onDownvote}
					feed={posts}
					user={user}
					profile={profile}
				/>
			) : null}
		</>
	)
}

export default Explore

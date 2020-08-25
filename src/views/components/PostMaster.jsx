import React, { useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

import Container from '../../components/Container/Container'
import Post from '../../components/Post/Post'

import { useToasts } from '../../components/Toast/Toast'
import { useIntl, FormattedMessage } from 'react-intl'
import { useProfile } from '../../stores/profile'
import { useAuth } from '../../stores/auth'
import { useMutation } from 'urql'

import * as queries from '../../queries/posts'
import { useState } from 'react'

const EmptyFeed = () => (
	<Container>
		<p>
			Oh no, your feed is empty! <Link to='/explore'>Explore</Link> to find
			people and engage with the community.
		</p>
	</Container>
)

const NoMorePosts = () => (
	<Container>
		<p>
			<FormattedMessage id='general.nomoreposts' />
		</p>
	</Container>
)

const PostList = ({ feed, ...props }) => {
	console.log(feed)
	const posts = feed.map(post => <Post key={post._id} {...post} {...props} />)

	if (feed) return feed.length === 0 ? <EmptyFeed /> : posts
	return null
}

function PostMaster({ posts, feedResPosts, setPosts }) {
	const { add } = useToasts()
	const { formatMessage: f } = useIntl()
	const { profile } = useProfile()
	const { user } = useAuth()
	const [fetchAgain, setFetchAgain] = useState(feedResPosts.length > 0)

	useEffect(() => {
		setFetchAgain(feedResPosts.length > 0)
	}, [feedResPosts])

	const [reactionRes, react] = useMutation(queries.react)
	const [commentRes, comment] = useMutation(queries.comment)
	const [pinRes, pin] = useMutation(queries.pin)
	const [unpinRes, unpin] = useMutation(queries.unpin)
	// const [reportRes, report] = useMutation(queries.report)
	const [removeRes, remove] = useMutation(queries.remove)

	const error = useCallback(
		() => add({ text: f({ id: 'errors.general' }), type: 'danger' }),
		[]
	)

	useEffect(() => reactionRes.error && error(), [reactionRes, error])
	useEffect(() => commentRes.error && error(), [commentRes, error])
	useEffect(() => pinRes.error && error(), [pinRes, error])
	useEffect(() => unpinRes.error && error(), [unpinRes, error])
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

				ref.comments.unshift(comment)

				setPosts(dupe)
				add({ text: f({ id: 'actions.commentpost.success' }), type: 'success' })

				currentTarget.elements['content'].value = ''
			}
		})
	}

	const onPin = ({ currentTarget }) => {
		const { id } = currentTarget.parentNode.parentNode.parentNode.dataset

		const pinnedIndex = posts.findIndex(post => post._id === id)

		if (posts[pinnedIndex].pinned) {
			unpin({ post: id }).then(response => {
				if (!response.error) {
					add({ text: f({ id: 'actions.unpinpost.success' }), type: 'success' })
				}
			})
		} else {
			pin({ post: id }).then(response => {
				if (!response.error) {
					add({ text: f({ id: 'actions.pinpost.success' }), type: 'success' })
				}
			})
		}
	}

	// const onReport = ({currentTarget}) => {
	// 	const { id } = currentTarget.parentNode.parentNode.parentNode.dataset

	// 	report({ post: id }).then(response => {
	// 		if (!response.error)
	// 			add({ text: f({ id: 'actions.pinpost.success' }), type: 'success' })
	// 	})
	// }

	const onDelete = ({ currentTarget }) => {
		const { id } = currentTarget.parentNode.parentNode.parentNode.dataset

		remove({ post: id }).then(response => {
			if (!response.error) {
				setPosts(posts.filter(p => p._id !== id))
				add({
					text: f({ id: 'actions.deletepost.success' }),
					type: 'success'
				})
			}
		})
	}

	//REFACTORME
	return (
		<>
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
			{!fetchAgain ? <NoMorePosts /> : null}
		</>
	)
}

export default PostMaster

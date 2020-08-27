import React, { useEffect, useCallback, useState } from 'react'

import Post from '../../components/Post/Post'

import { useToasts } from '../../components/Toast/Toast'
import { useIntl } from 'react-intl'
import { useProfile } from '../../stores/profile'
import { useAuth } from '../../stores/auth'
import { useMutation, useQuery } from 'urql'

import * as queries from '../../queries/posts'

const PostList = ({ feed, ...props }) => {
	const posts = feed.map(post => <Post key={post._id} {...post} {...props} />)

	return posts
}

//REFACTORME
function PostMaster({ posts, setPosts }) {
	const { add } = useToasts()
	const { formatMessage: f } = useIntl()
	const { profile } = useProfile()
	const { user } = useAuth()

	console.log(posts)

	const [reactionRes, react] = useMutation(queries.react)
	const [commentRes, comment] = useMutation(queries.comment)
	const [pinRes, pin] = useMutation(queries.pin)
	const [unpinRes, unpin] = useMutation(queries.unpin)
	const [removeRes, remove] = useMutation(queries.remove)

	const [commentsQuery, setCommentsQuery] = useState({
		post: null,
		before: null
	})
	const [commentsRes, comments] = useQuery({
		query: queries.comments,
		pause: !commentsQuery.post || !commentsQuery.before,
		variables: {
			...commentsQuery
		}
	})

	const error = useCallback(
		() => add({ text: f({ id: 'errors.general' }), type: 'danger' }),
		[]
	)

	useEffect(() => reactionRes.error && error(), [reactionRes, error])
	useEffect(() => commentRes.error && error(), [commentRes, error])
	useEffect(() => commentsRes.error && error(), [commentsRes, error])
	useEffect(() => pinRes.error && error(), [pinRes, error])
	useEffect(() => unpinRes.error && error(), [unpinRes, error])
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

	useEffect(() => {
		const { error, data } = commentsRes
		const index = posts.findIndex(post => post._id === commentsQuery.post)

		if (!error && data) {
			const dupe = [...posts]
			dupe[index].comments = [...dupe[index].comments, ...data.comments]

			setPosts(dupe)
		}
	}, [commentsRes.data])

	useEffect(() => {
		if (commentsQuery.post) comments()
	}, [commentsQuery])

	const onLoadComments = ({ currentTarget }) => {
		const { id } = currentTarget.parentNode.dataset

		const post = posts.findIndex(post => post._id === id)
		const loaded = posts[post].comments

		setCommentsQuery({
			post: posts[post]._id,
			before: loaded[loaded.length - 1]._id
		})
	}

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
				onDelete={onDelete}
				onUpvote={onUpvote}
				onDownvote={onDownvote}
				onLoadComments={
					commentsRes.data && commentsRes.data.comments.length < 5
						? null
						: onLoadComments
				}
				feed={posts}
				user={user}
				profile={profile}
			/>
		</>
	)
}

export default PostMaster

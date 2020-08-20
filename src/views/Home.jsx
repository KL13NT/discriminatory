import React, { useEffect, useCallback } from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import Composer from '../components/Composer/Composer'
import Container from '../components/Container/Container'
import Post from '../components/Post/Post'

import { useIntl } from 'react-intl'
import { useQuery, useMutation } from 'urql'
import { useState } from 'react'
import { useAuth } from '../stores/auth'
import { Link } from 'react-router-dom'

import { useToasts } from '../components/Toast/Toast'
import { useProfile } from '../stores/profile'

import * as queries from '../queries/posts'

const EmptyFeed = () => (
	<Container>
		<p>
			Oh no, your feed is empty! <Link to='/explore'>Explore</Link> to find
			people and engage with the community.
		</p>
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

function Home() {
	const { add } = useToasts()
	const { profile } = useProfile()
	const { formatMessage: f } = useIntl()
	const [pagination] = useState({
		limit: 20,
		before: null
	})
	const [shouldRefetch, setShouldRefetch] = useState(true)
	const [posts, setPosts] = useState([])
	const { user } = useAuth()

	const [postRes, post] = useMutation(queries.post)
	const [reactionRes, react] = useMutation(queries.react)
	const [commentRes, comment] = useMutation(queries.comment)
	const [pinRes, pin] = useMutation(queries.pin)
	// const [reportRes, report] = useMutation(queries.report)
	const [removeRes, remove] = useMutation(queries.remove)
	const [feedRes, reFeed] = useQuery({
		query: queries.feed,
		variables: {
			...pagination
		},
		pause: !user || !shouldRefetch
	})

	const error = useCallback(
		() => add({ text: f({ id: 'errors.general' }), type: 'danger' }),
		[] // eslint-disable-line
	)

	useEffect(() => {
		if (feedRes.data) {
			setShouldRefetch(false)
			setPosts([...posts, ...feedRes.data.feed])
		}
	}, [feedRes.data])

	useEffect(() => postRes.error && error(), [postRes, error])
	useEffect(() => reactionRes.error && error(), [reactionRes, error])
	useEffect(() => commentRes.error && error(), [commentRes, error])
	useEffect(() => pinRes.error && error(), [pinRes, error])
	// useEffect(() => reportRes.error && error(), [reportRes, error])
	useEffect(() => removeRes.error && error(), [removeRes, error])

	const onCompose = (content, location) => {
		post({ content, location })
		reFeed()
	}

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
					reaction
				}

				// add 1 to specified reaction
				updated[`${reaction.toLowerCase()}s`] += 1

				// remove old reaction if there is one
				if (old) updated[`${old.toLowerCase()}s`] -= 1

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

				setPosts(dupe)
				add({ text: f({ id: 'post.comment.success' }), type: 'success' })
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

	// const onReport = ({currentTarget}) => {
	// 	const { id } = currentTarget.parentNode.parentNode.parentNode.dataset

	// 	report({ post: id }).then(response => {
	// 		if (!response.error)
	// 			add({ text: f({ id: 'post.pin.success' }), type: 'success' })
	// 	})
	// }

	const onDelete = ({ currentTarget }) => {
		const { id } = currentTarget.parentNode.parentNode.parentNode.dataset

		remove({ post: id }).then(response => {
			if (!response.error) {
				setPosts(posts.filter(p => p._id !== post))
				add({ text: f({ id: 'post.remove.success' }), type: 'success' })
			}
		})
	}

	return (
		<>
			<PageTitle>{f({ id: 'home.title' })}</PageTitle>
			<Composer
				{...profile}
				verified={user.email_verified}
				onSubmit={onCompose}
			/>
			{feedRes.data ? (
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

export default Home

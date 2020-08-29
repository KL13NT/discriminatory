import React, { useEffect, useCallback } from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import PostMaster from './components/PostMaster'

import { Spinner } from '../components/Loading/LoadingPage'
import { useIntl, FormattedMessage } from 'react-intl'

import { useQuery } from 'urql'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useToasts } from '../components/Toast/Toast'

import * as queries from '../queries/posts'

import { PageState } from '../components/Errors/PageError'
import { getApolloErrorCode } from '../utils/general'
import LocaleSEO from './components/SEO'

const PostError = ({ error }) => {
	const { formatMessage: f } = useIntl()
	const code = getApolloErrorCode(error)

	if (code === 'NOT_FOUND')
		return (
			<PageState
				code={code}
				title={f({ id: 'states.nopost.title' })}
				subtitle={f({ id: 'states.nopost.description' })}
			/>
		)

	return <PageState code={code} />
}

function Post() {
	const { add } = useToasts()
	const { user_id, post } = useParams()
	const { formatMessage: f } = useIntl()

	const [posts, setPosts] = useState([])
	const [postRes] = useQuery({
		query: queries.getPost,
		variables: {
			member: user_id,
			post
		},
		requestPolicy: 'network-only'
	})

	const error = useCallback(
		() => add({ text: f({ id: 'errors.general' }), type: 'danger' }),
		[]
	)

	useEffect(() => {
		if (postRes.data) setPosts([postRes.data.post])
	}, [postRes.data])

	useEffect(() => postRes.error && console.log(postRes.error) && error(), [
		postRes,
		error
	])

	if (postRes.error) return <PostError error={postRes.error} />
	if (!postRes.data) return <Spinner />

	const { author, content } = postRes.data.post
	return (
		<>
			<LocaleSEO
				title='titles.post'
				description='titles.post.description'
				value={{ author: author.displayName, content: content }}
				path={`/${user_id}/${post}`}
			/>

			<PageTitle>
				<FormattedMessage
					id='titles.post'
					values={{
						author: author.displayName
					}}
				/>
			</PageTitle>

			<PostMaster setPosts={setPosts} posts={posts} />

			{postRes.fetching ? <Spinner /> : null}
		</>
	)
}

export default Post

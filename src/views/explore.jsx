import React, { useEffect } from 'react'
import PageTitle from '../components/PageTitle/PageTitle'

import { useIntl } from 'react-intl'
import { useQuery } from 'urql'
import { useState } from 'react'

import * as queries from '../queries/posts'
import PostMaster from './components/PostMaster'

function Explore() {
	const { formatMessage: f } = useIntl()
	const [pagination] = useState({
		before: null
	})
	const [posts, setPosts] = useState([])

	const [latestRes, reLatest] = useQuery({
		query: queries.explore,
		variables: {
			...pagination
		}
	})

	useEffect(() => {
		if (latestRes.data) setPosts([...latestRes.data.explore])
	}, [latestRes])

	return (
		<>
			<PageTitle>{f({ id: 'explore.title' })}</PageTitle>
			<PostMaster feedRes={latestRes} posts={posts} setPosts={setPosts} />
		</>
	)
}

export default Explore

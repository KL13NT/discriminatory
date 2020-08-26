import React, { useEffect, useCallback } from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import Container from '../components/Container/Container'

import { useIntl, FormattedMessage } from 'react-intl'
import { useQuery } from 'urql'
import { useState } from 'react'
import { useAuth } from '../stores/auth'
import { useParams, useLocation, Redirect } from 'react-router-dom'
import { useToasts } from '../components/Toast/Toast'

import { Spinner } from '../components/Loading/LoadingPage'
import { isNearEndScroll } from '../utils/general'
import { TabList } from '../components/Tabs/Tabs'
import { Tab } from '../components/Tabs/Tabs'
import PostMaster from './components/PostMaster'

import * as queries from '../queries/search'

const NoResults = () => (
	<p>
		<FormattedMessage id='search.noresults' />
	</p>
)

function useSearchQuery() {
	return new URLSearchParams(useLocation().search).get('q')
}

import { IntlPlural } from './components/Plural'

function Search() {
	const { add } = useToasts()
	const { user } = useAuth()
	const { formatMessage: f } = useIntl()
	const q = useSearchQuery()

	const [posts, setPosts] = useState([])

	const [pagination, setPagination] = useState({ before: null })
	const [searchRes] = useQuery({
		query: queries.search,
		variables: {
			...pagination,
			query: q
		},
		pause: !q || !user
	})

	useEffect(() => {
		//TODO: use setQuery here
		if (searchRes.data && searchRes.data.search.length > 0) {
			const queryPosts = searchRes.data.search
			setPosts([...posts, ...queryPosts])
			setPagination({
				before: queryPosts[queryPosts.length - 1]._id
			})
		}
	}, [searchRes.data])

	useEffect(
		() =>
			searchRes.error &&
			console.log(searchRes.error) &&
			add({ text: f({ id: 'errors.general' }), type: 'danger' }),
		[searchRes]
	)

	const onScroll = useCallback(() => {
		if (
			isNearEndScroll() &&
			!searchRes.fetching &&
			searchRes.data.search.posts.length > 0
		) {
			setPagination({
				before:
					searchRes.data.search.posts[searchRes.data.search.posts.length - 1]
						._id
			})
		}
	}, [searchRes])

	useEffect(() => {
		window.addEventListener('scroll', onScroll)

		return () => window.removeEventListener('scroll', onScroll)
	}, [searchRes, onScroll])

	if (!q) return <Redirect to='/explore' />
	if (searchRes.error) return <NoResults />
	if (searchRes.fetching || !searchRes.data) return <Spinner />
	if (searchRes.data)
		return (
			<>
				<PageTitle
					tick={
						<IntlPlural value={posts.length} localeContainId='plurals.result' />
					}
					subtitle={q}
				>
					<FormattedMessage id='titles.search' />
				</PageTitle>
				{posts.length === 0 ? <NoResults /> : null}
			</>
		)
}

export default Search

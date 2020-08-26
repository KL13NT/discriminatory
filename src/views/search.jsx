import React, { useEffect } from 'react'
import PageTitle from '../components/PageTitle/PageTitle'

import { useIntl, FormattedMessage } from 'react-intl'
import { useQuery } from 'urql'
import { useState } from 'react'
import { useAuth } from '../stores/auth'
import { useLocation, Redirect } from 'react-router-dom'
import { useToasts } from '../components/Toast/Toast'

import { Spinner } from '../components/Loading/LoadingPage'

import * as queries from '../queries/search'

const NoResults = () => (
	<PageState
		title={<FormattedMessage id='errors.nosearchresults.title' />}
		subtitle={<FormattedMessage id='errors.nosearchresults.subtitle' />}
	/>
)

function useSearchQuery() {
	return new URLSearchParams(useLocation().search).get('q')
}

import { IntlPlural } from './components/Plural'
import PostMaster from './components/PostMaster'
import { PageState } from '../components/Errors/PageError'

function Search() {
	const { add } = useToasts()
	const { user } = useAuth()
	const { formatMessage: f } = useIntl()
	const q = useSearchQuery()

	const [posts, setPosts] = useState([])

	const [searchRes] = useQuery({
		query: queries.search,
		variables: {
			query: q
		},
		pause: !q || !user
	})

	useEffect(() => {
		if (searchRes.data) setPosts(searchRes.data.search)
	}, [searchRes.data])

	useEffect(
		() =>
			searchRes.error &&
			console.log(searchRes.error) &&
			add({ text: f({ id: 'errors.general' }), type: 'danger' }),
		[searchRes]
	)

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
				<PostMaster
					feedResPosts={searchRes.data.search}
					setPosts={setPosts}
					posts={posts}
				/>
				{posts.length === 0 ? <NoResults /> : null}
			</>
		)
}

export default Search

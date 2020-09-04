import { hostname } from 'config'

import React from 'react'
import { Helmet } from 'react-helmet'
import { useIntl } from 'react-intl'

const sitename = 'DiscriminatoryNetwork'
const defaultTitleId = 'titles.discriminatory'
const defaultDescriptionId = 'titles.description'
const defaultPath = '/'

const Images = ({ image }) => {
	const ogImageUrl = `${hostname}/${image}`

	return (
		<>
			<meta content={ogImageUrl} property='og:image' />
			<meta content={ogImageUrl} property='og:image:url' />
			<meta content={ogImageUrl} property='og:image:secure_url' />
			<meta content={ogImageUrl} property='twitter:image' />
		</>
	)
}

function LocaleSEO({
	title = defaultTitleId,
	description = defaultDescriptionId,
	path = defaultPath,
	values,
	image
}) {
	const { formatMessage: f } = useIntl()
	const url = `${hostname}/${path}`

	const intlDescription = f({ id: description }, values)
	const intlTitle =
		title === defaultTitleId
			? f({ id: defaultTitleId })
			: f({ id: defaultTitleId }) + ' - ' + f({ id: title }, values)

	return (
		<>
			<Helmet>
				<script
					data-ad-client='ca-pub-4278004686608414'
					async
					src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
				></script>
				<meta content={'image/jpeg'} property='og:image:type' />
				<meta content='summary_large_image' name='twitter:card'></meta>
				<meta content='website' property='og:type' />
				<meta content={url} property='og:url' />
				<meta content={sitename} property='og:site_name' />
				<meta content='@Nabil_Tharwat' property='twitter:creator' />
				<meta content='@Nabil_Tharwat16' property='twitter:site' />
				{image ? <Images image={image} /> : null}
			</Helmet>

			<Helmet>
				<title>{intlTitle}</title>
				<meta content={intlTitle} property='og:title' />
				<meta content={intlTitle} property='twitter:title' />
			</Helmet>

			<Helmet>
				<meta content={intlDescription} name='description' />
				<meta content={intlDescription} property='og:description' />
				<meta content={intlDescription} property='twitter:description' />
			</Helmet>
		</>
	)
}

function SEO({ title, description, path = defaultPath, image }) {
	const url = `${hostname}${path}`
	const finalTitle = title

	return (
		<Helmet>
			<title>{finalTitle}</title>
			<script
				data-ad-client='ca-pub-4278004686608414'
				async
				src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
			></script>
			<meta content={finalTitle} property='og:title' />
			<meta content={finalTitle} property='twitter:title' />
			<meta content={description} name='description' />
			<meta content={description} property='og:description' />
			<meta content={description} property='twitter:description' />
			<meta content={'image/jpeg'} property='og:image:type' />
			<meta content='summary_large_image' name='twitter:card'></meta>
			<meta content='website' property='og:type' />
			<meta content={url} property='og:url' />
			<meta content={sitename} property='og:site_name' />
			<meta content='@Nabil_Tharwat' property='twitter:creator' />
			<meta content='@Nabil_Tharwat16' property='twitter:site' />
			{image ? <Images image={image} /> : null}
		</Helmet>
	)
}

export default LocaleSEO
export { SEO }

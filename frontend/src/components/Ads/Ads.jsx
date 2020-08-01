import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Container from '../Container/Container'

import styles from './Ads.module.sass'
import { Link } from 'react-router-dom'

import Img1 from '../../media/ad-placeholder-01.jpg'
import Img2 from '../../media/ad-placeholder-02.jpg'
import Img3 from '../../media/ad-placeholder-03.jpg'
import Img4 from '../../media/ad-placeholder-04.jpg'
import Img5 from '../../media/ad-placeholder-05.jpg'

const SCRIPT_URL =
	'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'

const UNSPLASH =
	'https://unsplash.com?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText'

const IMAGES = [
	{
		src: Img1,
		alt: 'A snow covered mountain under full moon in pink dusk sky',
		photographer: 'Ingmar',
		link:
			'https://unsplash.com/@ingmarr?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText'
	},
	{
		src: Img2,
		alt: 'A leaf covered with dew drops',
		photographer: 'Bjhelyn Tanacio',
		link:
			'https://unsplash.com/@babylynsantos78?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
	},
	{
		src: Img3,
		alt: 'Yellow and black bee on purple flower',
		photographer: 'Gabrielle Henderson',
		link:
			'https://unsplash.com/@gabriellefaithhenderson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
	},
	{
		src: Img4,
		alt:
			'Brown and gray mountains during daytime with snow covered mountains in the background',
		photographer: 'Jeanson Wong',
		link:
			'https://unsplash.com/@junscythe?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
	},
	{
		src: Img5,
		alt: 'bridge over body of water during sunset',
		photographer: 'Riley',
		link:
			'https://unsplash.com/@rldgs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
	}
]

function Placeholder() {
	const { src, alt, photographer, link } = IMAGES[
		Math.floor(Math.random() * IMAGES.length)
	]

	return (
		<div className={styles.placeholder}>
			<div>
				<img src={src} alt={alt} />
				<span className={styles.credits}>
					Photo by <a href={link}>{photographer}</a> on{' '}
					<a href={UNSPLASH}>Unsplash</a>.
				</span>
			</div>
			<span>
				We couldn't load ads because you've disabled them or a network error
				occurred, so here's a beautiful picture instead, handpicked by our
				developers.
			</span>
		</div>
	)
}

//TODO: Hook to Google Adsense
function Ads({ isEnabled }) {
	const [isBlocked, setBlocked] = useState(false)
	const [script, setScript] = useState('')

	useEffect(() => {
		fetch(SCRIPT_URL)
			.then(response => response.text())
			.then(setScript)
			.catch(() => setBlocked(true))
	}, [])

	if (!isEnabled) return null
	return (
		<>
			<Container className={styles.ads}>
				{isBlocked ? <Placeholder /> : null}
				<script data-ad-client='ca-pub-4278004686608414' async>
					{script}
				</script>
			</Container>
		</>
	)
}

Ads.propTypes = {
	isEnabled: PropTypes.bool.isRequired
}

export default Ads

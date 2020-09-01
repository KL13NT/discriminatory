import React from 'react'
import { Helmet } from 'react-helmet'
import { injectIntl } from 'gatsby-plugin-react-intl'

import '../style/main.tokens.sass'
import '../style/utils.global.sass'
import '../components/Button/Button.module.sass'
import './landing.sass'

import logo from '../assets/logo_full.svg'
import landing02 from './static/landing-02.jpg'
import landing03 from './static/landing-03.jpg'
import landing04 from './static/landing-04.jpg'
import landing05 from './static/landing-05.jpg'
import { SEO } from '../views/components/SEO'

const Landing = ({ intl: { formatMessage: f, locale } }) => {
	const dir = locale === 'ar' ? 'rtl' : 'ltr'

	const EnFonts = () => (
		<Helmet>
			<link
				href='https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;900&display=swap'
				rel='stylesheet'
			/>
		</Helmet>
	)

	const ArFonts = () => (
		<Helmet>
			<link
				href='https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap'
				rel='stylesheet'
			/>
		</Helmet>
	)

	return (
		<>
			<SEO title={f({ id: 'titles.about' })} />
			{dir === 'ltr' ? <EnFonts /> : <ArFonts />}
			<Helmet>
				<meta charset='UTF-8' />
				<meta name='viewport' content='width=device-width,initial-scale=1' />
				<title>{f({ id: 'general.motto' })}</title>
				<body dir={dir} />
			</Helmet>
			<header className='m-header'>
				<div>
					<div className='m-navbar'>
						<img src={logo} alt='logo' />
					</div>
					<div className='m-header-text'>
						<h1>{f({ id: 'about.header.h1' })}</h1>
						<p>{f({ id: 'about.header.p' })}</p>
					</div>
					<m className='header-links'>
						<a className='button info' href='/home'>
							{f({ id: 'about.header.start' })}
						</a>
						<a href='/explore'>{f({ id: 'about.header.explore' })}</a>
					</m>
				</div>
			</header>
			<section className='c-section forwards'>
				<div className='c-section-text'>
					<p>
						{f({ id: 'about.section1.p1' })}
						<span className='big'> {f({ id: 'about.section1.p2' })}</span>{' '}
						{f({ id: 'about.section1.p3' })}
						<span className='big bold'> {f({ id: 'about.section1.p4' })},</span>
					</p>
					<p>
						{f({ id: 'about.section1.p5' })}
						<span className='bold'> {f({ id: 'about.section1.p6' })} </span>
						{f({ id: 'about.section1.p7' })}
					</p>
				</div>
				<div className='c-section-img'>
					<img
						src={landing02}
						loading='lazy'
						alt={f({ id: 'about.section1.alt' })}
					/>
				</div>
			</section>
			<section className='c-section backwards'>
				<div className='c-section-text'>
					<p>
						{f({ id: 'about.section2.p1' })}
						<span className='big bold'> {f({ id: 'about.section2.p2' })}</span>
					</p>
					<p>
						{f({ id: 'about.section2.p3' })}
						<span className='bold'> {f({ id: 'about.section2.p4' })}</span>{' '}
						{f({ id: 'about.section2.p5' })}
						<span className='bold'> {f({ id: 'about.section2.p6' })}</span>{' '}
						{f({ id: 'about.section2.p7' })}
					</p>
				</div>
				<div className='c-section-img'>
					<img
						src={landing03}
						loading='lazy'
						alt={f({ id: 'about.section2.alt' })}
					/>
				</div>
			</section>
			<section className='c-section vertical'>
				<div className='c-section-text'>
					<p>
						<img src={logo} alt='Discriminatory' />{' '}
						{f({ id: 'about.section3.p1' })}
					</p>
				</div>
				<div className='c-section-img preview'>
					<div className='preview-img'>
						<img
							src={landing04}
							loading='lazy'
							alt={f({ id: 'about.section3.alt1' })}
						/>
					</div>
					<div className='preview-img'>
						<img
							src={landing05}
							loading='lazy'
							alt={f({ id: 'about.section3.alt2' })}
						/>
					</div>
				</div>
			</section>
			<section className='c-section vertical'>
				<div className='c-section-text u-center'>
					<p>
						<a href='/register' className='u-link'>
							{f({ id: 'about.section4.p1' })}
						</a>{' '}
						{f({ id: 'about.section4.p2' })}
					</p>
				</div>
			</section>
			<section className='c-section vertical'>
				<div className='c-section-text u-center'>
					<p>
						<a href='/register' className='u-link'>
							{f({ id: 'about.section4.p1' })}
						</a>{' '}
						{f({ id: 'about.section4.p2' })}
					</p>
				</div>
			</section>
		</>
	)
}

export default injectIntl(Landing)

import React, { useState, useEffect, useCallback } from 'react'

import Container from '../Container/Container'
import Avatar from '../Avatar/Avatar'
import Textarea from '../Textarea/Textarea'
import Button from '../Button/Button'
import LocationPicker from '../LocationPicker/LocationPicker'
import Overlay from '../Overlay/Overlay'

import { useMutation } from 'urql'
import { useIntl } from 'react-intl'
import { useToasts } from '../Toast/Toast'
import { useComposer } from '../../stores/composer'
import { useProfile } from '../../stores/profile'
import { usePosts } from '../../stores/posts'

import styles from './Composer.module.sass'

import * as queries from '../../queries/posts'
import cls from '../../utils/cls'

function Composer({ avatar, verified, onSuccess, ...props }) {
	const { formatMessage: f } = useIntl()

	const { add } = useToasts()
	const [enabled, toggle] = useState(true)
	const [canSubmit, setCanSubmitState] = useState(false)
	const [postData, setPostData] = useState({ location: null, content: '' })

	useEffect(() => {
		if (postData.content.trim().length > 0 && postData.location)
			setCanSubmitState(true)
	}, [postData.content, postData.location, postData])

	const onChange = ({ currentTarget }) =>
		setPostData({ ...postData, content: currentTarget.value })

	const onLocationPick = location => setPostData({ ...postData, location })

	const error = useCallback(
		() => add({ text: f({ id: 'errors.general' }), type: 'danger' }),
		[] // eslint-disable-line
	)
	const [postRes, post] = useMutation(queries.post)

	useEffect(() => postRes.error && error(), [postRes, error])

	const onPostSubmit = e => {
		e.persist()
		e.preventDefault()

		toggle(false)
		add({
			text: f({ id: 'actions.createpost.progress' }),
			type: 'info'
		})

		const data = {
			...postData,
			content: postData.content.trim()
		}

		post(data).then(response => {
			if (!response.error) {
				onSuccess()
				toggle(true)
				setPostData({ content: '', location: null })
			} else {
				toggle(true)
				add({ type: 'danger', text: f({ id: 'errors.general' }) })
			}
		})
	}

	return (
		<>
			<Container
				className={cls(styles.composer, !enabled ? 'u-disabled' : null)}
				{...props}
			>
				<form onSubmit={onPostSubmit}>
					<div>
						<Avatar avatar={avatar} verified={verified} />
						<h1>{f({ id: 'composer.title' })}</h1>
					</div>
					<Textarea
						resize
						required
						disabled={!enabled}
						placeholder={f({ id: 'composer.placeholder' })}
						value={postData.content}
						onChange={onChange}
					/>
					<LocationPicker onPick={onLocationPick} />
					<Button disabled={!canSubmit || !enabled} type='submit'>
						{f({ id: 'composer.submit' })}
					</Button>
				</form>
			</Container>
		</>
	)
}

function OverlayComposer() {
	const { add } = useToasts()
	const { active, toggle } = useComposer()
	const { profile } = useProfile()
	const { formatMessage: f } = useIntl()
	const [postRes, post] = useMutation(queries.post)

	const { home, setHome } = usePosts(state => ({
		home: state.home,
		setHome: state.setHome
	}))

	const error = useCallback(
		() => add({ text: f({ id: 'errors.general' }), type: 'danger' }),
		[] // eslint-disable-line
	)

	useEffect(() => postRes.error && error(), [postRes.error, error])

	const onCompose = newPost => {
		post(newPost).then(res => {
			if (!res.error) {
				add({
					text: f({ id: 'actions.createpost.success' }),
					type: 'success'
				})

				const post = {
					author: profile,
					comments: [],
					reactions: { upvotes: 0, downvotes: 0 },
					created: Date.now(),
					...newPost
				}

				setHome([post, ...home])
			}
		})
	}

	if (!active) return null
	return (
		<Overlay onClose={toggle}>
			<Composer {...profile} verified={profile.verified} onSubmit={onCompose} />
		</Overlay>
	)
}

export default Composer
export { OverlayComposer }

import React from 'react'

import {
	withKnobs,
	text,
	boolean,
	number,
	select
} from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { setConsoleOptions } from '@storybook/addon-console'

import { Post } from './Post.jsx'
import PFP from '../../assets/73.jpg'

import StoryRouter from 'storybook-react-router'

setConsoleOptions()

//TODO: refactor this to multiple subcomponents in multiple files in same directory

export default {
	title: 'Post',
	decorators: [withKnobs, withA11y, StoryRouter()],
	// component: Post,
	subcomponents: [Post],
	description: 'Used to create post details'
}

import create from 'zustand'

const [usePostReaction] = create(set => ({
	reaction: null,
	upvote: () =>
		set(({ reaction }) => ({
			reaction: reaction === 'upvote' ? null : 'upvote'
		})),
	downvote: () => set(() => ({ reaction: 'downvote' }))
}))

const onCommentCreate = form => {
	console.log(form.value)
	// alert(e.currentTarget.value)
	// console.log('submit')
}

const onTest = (id, e) => {
	console.log('test called')
	if (e.preventDefault) e.preventDefault()
	return null
}

export const UnverifiedPost = () => {
	const { upvote, downvote, reaction } = usePostReaction()

	return (
		<div>
			<Post
				onDelete={onTest}
				onPin={onTest}
				name='Selma Rayan'
				location='The Lagoons Hotel'
				date='22 mins'
				avatar={PFP}
				id='8102371982759'
				content='The Lagoons Hotel just told me they dont allow Hijab on beaches.'
				onUpvote={upvote}
				onDownvote={downvote}
				reaction={reaction}
				onCommentCreate={onCommentCreate}
				ratings={{
					total: 50,
					majority: 'upvotes'
				}}
				comments={[
					{
						content: 'Test comment',
						details: {
							avatar: PFP,
							name: 'Selma Rayan',
							id: '8102371982759'
						}
					}
				]}
			/>
		</div>
	)
}

export const VerifiedPost = () => (
					<div>
						<Post
							onDelete={onTest}
							onPin={onTest}
							name='Selma Rayan'
							location='The Lagoons Hotel'
							date='22 mins'
							verified
							avatar={PFP}
							content='The Lagoons Hotel just told me they dont allow Hijab on beaches.'
							onUpvote={onTest}
							onDownvote={onTest}
							onCommentCreate={onTest}
							ratings={{
								total: 50,
								majority: 'upvotes'
							}}
							comments={[
								{
									content: 'Test comment',
									details: {
										avatar: PFP,
										name: 'Selma Rayan',
										id: '8102371982759'
									}
								}
							]}
						/>
					</div>
				)

//TODO: add proptypes after refactoring above

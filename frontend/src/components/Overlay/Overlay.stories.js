import React from 'react'

import { withA11y } from '@storybook/addon-a11y'
import { setConsoleOptions } from '@storybook/addon-console'

import Overlay from './Overlay.jsx'

setConsoleOptions()

//TODO: refactor this to multiple subcomponents in multiple files in same directory

export default {
	title: 'Overlay',
	decorators: [withA11y],
	// component: Overlay,
	subcomponents: [Overlay],
	description: 'Used to create Overlay details'
}

import create from 'zustand'
import Button from '../Button/Button.jsx'

const [useOverlay] = create(set => ({
	isOpen: null,
	toggle: () =>
		set(({ isOpen }) => ({
			isOpen: !isOpen
		}))
}))

export const General = () => {
	const { isOpen, toggle } = useOverlay()

	return (
		<div>
			<Button onClick={toggle}>Open overlay</Button>
			{isOpen ? (
				<Overlay onClose={toggle}>
					<h1>Hello</h1>
				</Overlay>
			) : null}
		</div>
	)
}

export const Scrollable = () => {
	const { isOpen, toggle } = useOverlay()

	return (
		<div>
			<Button onClick={toggle}>Open overlay</Button>
			{isOpen ? (
				<Overlay subtitle='See whats new' title='Whats new' onClose={toggle}>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec
						magna imperdiet, tempus metus maximus, gravida turpis. Etiam in
						lorem non diam maximus feugiat. Ut sit amet mattis libero, imperdiet
						pellentesque risus. In efficitur placerat tempor. Sed quis congue
						ligula. Donec quis cursus felis. Duis pellentesque sed nisl lacinia
						venenatis. Curabitur nec laoreet elit. Etiam ornare varius mi a
						tincidunt. Donec justo massa, hendrerit id ultricies congue,
						suscipit suscipit ex. Praesent in bibendum augue. Nulla hendrerit
						placerat sodales. Nunc ut massa interdum, scelerisque ligula vel,
						consectetur dui. Etiam varius, nunc sed pulvinar lobortis, tortor
						massa scelerisque lacus, vel pharetra justo urna ut orci. Sed in
						turpis rutrum eros pulvinar fermentum. Nunc lobortis felis risus, eu
						tempor nulla sollicitudin in. Duis molestie feugiat elit, sit amet
						bibendum arcu condimentum blandit. Mauris dapibus purus id nisl
						faucibus ultricies. Suspendisse ac ultrices nibh. Phasellus dolor
						diam, gravida sed odio sed, commodo scelerisque risus. Nulla
						suscipit dolor ut porta accumsan. Cras nec ante neque. Vivamus
						egestas mi et sagittis iaculis. Maecenas eleifend dictum sem ac
						maximus. Pellentesque dapibus nunc ut suscipit tristique. Integer
						metus nisi, maximus et posuere vel, condimentum sit amet tellus.
						Vestibulum egestas consequat nulla, ut lobortis sapien tincidunt
						non. Ut sed ligula fermentum, accumsan erat ac, auctor ipsum.
						Aliquam ut sem ut leo rhoncus pellentesque id vel lorem.
						Pellentesque sed erat quis libero rutrum mollis nec ac sem. Nunc
						hendrerit non nibh et volutpat. Nullam vel nibh interdum, tristique
						augue eget, commodo ex. Proin tellus orci, fermentum ut ullamcorper
						vitae, eleifend nec magna. Nam at est posuere ex eleifend blandit et
						nec nibh. Cras vel faucibus quam. Pellentesque dapibus mauris
						auctor, ultrices libero iaculis, tempor nisi. Etiam elementum turpis
						vehicula, ultricies quam quis, egestas nisl. Fusce ac imperdiet
						diam. Etiam auctor diam in orci mollis, nec ultrices velit
						vulputate. Phasellus facilisis varius nulla, sed tincidunt quam
						congue eu. Aliquam placerat ultrices efficitur. Vestibulum eget
						faucibus dolor. Nam iaculis ex id tellus eleifend vulputate. Nulla
						non massa sem. Quisque placerat libero eros, sed condimentum turpis
						varius eu. Nullam in nisl vitae lacus vestibulum vehicula. Curabitur
						aliquam dictum bibendum. Sed sollicitudin semper tortor eget
						tincidunt. Integer sem nibh, tincidunt eu dui quis, facilisis tempus
						tortor. Mauris sed finibus sem. Suspendisse imperdiet rhoncus quam,
						ac porttitor nisl viverra vitae. Curabitur iaculis ligula a nisi
						fermentum, et venenatis augue tincidunt. Fusce ante justo, tincidunt
						non accumsan in, hendrerit sit amet velit. Nulla eleifend lacinia
						eros, ut tristique mauris placerat non. Praesent aliquam neque ac
						leo faucibus lobortis. Suspendisse pretium elit mi, ac scelerisque
						lorem commodo eget. Aliquam convallis in dui vitae efficitur. Duis
						maximus enim mi, vel eleifend ipsum dignissim consequat. Aliquam sed
						dictum orci. Duis commodo, risus non finibus tempor, velit dolor
						commodo risus, non fermentum diam sem ac dolor. Phasellus faucibus
						laoreet pulvinar. Ut eu pellentesque mi. Ut magna lectus, suscipit a
						volutpat ut, vehicula ac lectus. Mauris non lacinia sapien.
						Vestibulum dapibus nec lacus et euismod. Donec luctus neque quis sem
						auctor laoreet. Etiam eu pulvinar justo. Donec vehicula metus eu sem
						vehicula aliquet. Maecenas mattis nunc enim, quis commodo orci
						finibus quis. Curabitur consequat justo nulla. Aliquam erat
						volutpat. Suspendisse sodales ante diam, aliquam porta nisl tempor
						ut. Vestibulum vitae imperdiet est. Proin facilisis ornare nibh a
						vulputate. Cras vitae mollis libero. In non augue dignissim, aliquet
						diam quis, porta tortor. Mauris fermentum, ex non consectetur
						aliquet, turpis arcu lobortis metus, in pulvinar diam est mattis
						ligula. Duis et lobortis enim, id gravida lacus. Vivamus condimentum
						nunc odio, a ullamcorper felis pretium vitae. Vestibulum consequat
						orci a laoreet tristique. Nullam vitae malesuada libero, vitae
						laoreet dui. Suspendisse nec sapien nec ex vestibulum porta. Donec
						blandit, tortor ac hendrerit tincidunt, justo sem mattis erat, et
						dignissim enim lorem ac justo. Curabitur aliquet, risus eget
						sagittis sagittis, dolor ante gravida nulla, sollicitudin sagittis
						augue quam vitae orci. Nunc ut rutrum nisi. Lorem ipsum dolor sit
						amet, consectetur adipiscing elit. Nulla dignissim venenatis luctus.
						Pellentesque lacinia, nibh vel blandit aliquam, odio risus dictum
						erat, facilisis vulputate orci sem eu diam. In hac habitasse platea
						dictumst. Mauris sed ipsum ac mauris eleifend congue. Aenean at
						libero semper, pulvinar massa in, ultricies enim. Vivamus
						pellentesque ac ante sit amet accumsan. Donec id posuere nunc,
						sodales pharetra libero. Donec at blandit nisl. Nulla quis tellus at
						orci lobortis lacinia. Aliquam eget nunc malesuada, pharetra nibh
						nec, bibendum quam. Fusce egestas venenatis massa at rhoncus.
						Aliquam non nunc nulla. Suspendisse aliquam eros nec urna dapibus
						tristique.
					</p>
				</Overlay>
			) : null}
		</div>
	)
}

import create from 'zustand'
import { getAvatarUrl } from '../utils/profiles'

const [useProfiles] = create((set, get) => ({
	profiles: {},
	add: profile =>
		set(state => ({
			profiles: {
				...state.profiles,
				profile
			}
		})),

	set: ({ ...profiles }) => {
		console.log(profiles)
		Object.keys(profiles).forEach(profile => {
			if (get().profiles[profile]) delete profiles[profile]

			const av = profiles[profile].avatar

			if (av)
				getAvatarUrl(av)
					.then(url => {
						profiles[profile].avatar = url
					})
					.catch(e => {
						console.log('COPY THIS WHEN REPORTING', e)
					})
		})

		return set(state => ({
			profiles: {
				...state.profiles,
				...profiles
			}
		}))
	}
}))

export { useProfiles }

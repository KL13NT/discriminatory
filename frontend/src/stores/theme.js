import create from 'zustand'

const [useTheme] = create(set => ({
	theme: 'dark-theme',
	options: ['dark-theme'],
	set: theme =>
		set(state => {
			if (!state.options.includes(theme))
				throw Error(
					'This theme is not in the options array. Consider adding it first.'
				)
			return {
				...state,
				theme
			}
		})
}))

export { useTheme }

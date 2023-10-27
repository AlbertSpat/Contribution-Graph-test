export const getContributeDate = async () => {
	const response = await fetch('https://dpg.gg/test/calendar.json')
	const result = await response.json()
	return result
}

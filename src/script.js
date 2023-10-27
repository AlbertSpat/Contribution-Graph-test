import { getContributeDate } from './api.js'
import { format, compareAsc } from 'date-fns'
import '../public/style.css'

const data = await getContributeDate()
const getColorContribution = contributions => {
	switch (true) {
		case contributions >= 1 && contributions <= 9:
			return '#ACD5F2'
		case contributions >= 10 && contributions <= 19:
			return '#7FA8C9'
		case contributions >= 20 && contributions <= 29:
			return '#527BA0'
		case contributions >= 30:
			return '#254E77'
		default:
			return '#EDEDED'
	}
}
const generateTable = (rows = 7, columns = 51) => {
	for (let i = 0; i < rows; i++) {
		const rows = document.querySelectorAll('tbody > tr')
		const currentRow = rows[i]

		for (let l = 0; l < columns; l++) {
			const cell = document.createElement('td')
			cell.style.backgroundColor = getColorContribution(0)
			currentRow.appendChild(cell)
		}
	}
}

generateTable()

for (const [date, contributions] of Object.entries(data)) {
	const weekYear = format(new Date(date), 'I')
	const numberWeek = format(new Date(date), 'i')
	const currentNumberWeekYear = format(new Date(), 'w')

	if (weekYear > 52) {
		continue
	}

	console.log(numberWeek, 'NumberWeek')

	const cell = document.querySelector(
		`tr:nth-child(${numberWeek}) > td:nth-child(${weekYear}`
	)
	cell.className = 'contribution-cell'
	cell.style.backgroundColor = getColorContribution(contributions)
	cell.setAttribute('data-contributions', contributions)
	const selectedDay = format(new Date(date), 'EEEE, MMMM, dd, Y')
	cell.setAttribute('data-date', selectedDay)
}

const choice = document.querySelectorAll('td')

choice.forEach(choiceItem => {
	choiceItem.addEventListener('click', event => {
		const selected_contributions = document.querySelector(
			'.selected_contributions'
		)
		const contributions = event.target.dataset.contributions
		const date = event.target.dataset.date
		const contributionsElement = document.getElementById(
			'selected_contributions__title'
		)
		const dateElement = document.getElementById('selected_contributions__date')
		const { offsetTop, offsetLeft } = event.target

		if (contributions == undefined) {
			return
		}
		contributionsElement.innerText = `${contributions} contributions`
		dateElement.innerText = date

		selected_contributions.style.opacity = 1
		setInterval(() => {
			selected_contributions.style.opacity = 0
		}, 10000)
		selected_contributions.style.top = `${offsetTop - 25}px`
		selected_contributions.style.left = `${offsetLeft - 45}px`
	})
})

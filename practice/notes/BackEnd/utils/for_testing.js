/**
 * Windows users: Jest may not work if the path of the project directory
 * contains a directory that has spaces in its name.
 *   
 */

const reverse = (string) => {
	return string
		.split('')
		.reverse()
		.join('')
}

const average = (array) => {
	const reducer = (sum, item) => {
		return sum + item
	}

	return array.length===0? 0 : array.reduce(reducer, 0) / array.length
}

module.exports = {
	reverse,
	average,
}
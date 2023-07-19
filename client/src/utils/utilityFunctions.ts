import Axios from 'axios'

const getFormattedFirstWord = (str: string) => {
	const firstWord = str.split(' ')[0]
	return firstWord.charAt(0).toUpperCase() + firstWord.slice(1)
}

const formatDate = (date: string) => {
	const dateObj = new Date(date)
	const month = dateObj.toLocaleString('default', { month: 'long' })
	const day = dateObj.getDate()
	const year = dateObj.getFullYear()
	return `${month} ${day}, ${year}`
}

const formatDollarAmount = (num: number) => {
  const withoutDecimal = num.toLocaleString('en-US')
  const withDecimal = num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return Number.isInteger(num) ? withoutDecimal : withDecimal
}

const removeCommas = (num: number) => {
  const numStr = num.toString()
  return parseFloat(numStr.replace(',', ''))
}

const roundDown = (num: number) => {
  return Math.floor(num * 100) / 100
}

const calculatePercentChange = (current: number, previous: number) => {
  return ((current - previous) / previous) * 100
}

const getUserId = async (email: string) => {
  try {
    const res = await Axios.get(`/api/get_user_id/${email}`)
    return res.data
    
  } catch (err) {
    console.log(`Error getting user id: ${err}`)
  }
}

export { 
  getFormattedFirstWord, 
  formatDate,
  formatDollarAmount,
  removeCommas,
  roundDown,
  calculatePercentChange, 
  getUserId 
}
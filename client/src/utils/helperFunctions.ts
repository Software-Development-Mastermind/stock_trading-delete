const getFormattedFirstWord = (str: string) => {
    const firstWord = str.split(' ')[0]
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1)
}

export { getFormattedFirstWord }
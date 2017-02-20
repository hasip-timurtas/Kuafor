export default (string) => {
  const splitString = string.split(/[ -]+/)
  const initialsArr = splitString.map((word, i) => i < 2 ? word.charAt(0).toUpperCase() : null)
  return initialsArr.join('')
}

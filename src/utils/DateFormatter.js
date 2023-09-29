const formatDate = (currentDate) => {
  const day = currentDate.getDate().toString().padStart(2, '0')
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const year = currentDate.getFullYear().toString()

  return `${day}-${month}-${year}`
}

export default formatDate
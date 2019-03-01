const orderStatuses = [
  { value: 'Rozpracováno', color: '#ff9800' },
  { value: 'Dokončeno', color: '#4caf50' },
  { value: 'Objednáno', color: '#3f51b5' },
  { value: 'Uzavřeno', color: '#03a9f4' },
  { value: 'Zrušeno', color: '#f44336' },
]

const getColor = val => {
  const status = orderStatuses.find(o => o.value === val)
  return status && status.color
}

export {
  orderStatuses,
  getColor
}
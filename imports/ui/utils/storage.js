const ITEM_TYPES_KEY = 'jakubkolo_itemTypes'
const COLUMNS_KEY = 'jakubkolo_productColumns'

export const getItemTypes = () => {
  return JSON.parse(localStorage.getItem(ITEM_TYPES_KEY)) || []
}

export const addItemType = itemType => {
  let items = getItemTypes()
  if (!items.find(i => i == itemType)) {
    if (itemType !== '') {
      items.push(itemType)
      localStorage.setItem(ITEM_TYPES_KEY, JSON.stringify(items))
      return true
    }
  }
  return false
}

export const removeItemType = itemType => {
  let items = getItemTypes()
  let newItems = items.filter(i => i != itemType)
  localStorage.setItem(ITEM_TYPES_KEY, JSON.stringify(newItems))
  return true
}

export const getColumns = () => {
  return JSON.parse(localStorage.getItem(COLUMNS_KEY))
}

export const setColumns = cols => {
  return localStorage.setItem(COLUMNS_KEY, JSON.stringify(cols))
}
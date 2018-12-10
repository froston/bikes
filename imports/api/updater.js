import { Meteor } from 'meteor/meteor'
import { parseString } from 'xml2js'
import xpath from 'xml2js-xpath'
import request from 'request'
import { Eshops } from './eshops'
import { Products } from './products'

const opt = {
  trim: true,
  explicitArray: false,
}

const getTagValue = (item, tagName) => xpath.find(item, `//${tagName}`)[0]

const saveItem = (item, attrs) => {
  const code = getTagValue(item, attrs.id)
  const price_vo = getTagValue(item, attrs.price_vo)
  const price_mo = getTagValue(item, attrs.price_mo)
  const amount = getTagValue(item, attrs.amount)
  // find existing product
  const product = Products.findOne({ code: code })
  if (product) {
    // update only if changed
    if (price_vo !== product.price_vo || price_mo !== product.price_mo || amount !== product.amount) {
      Products.update({ code }, { $set: { price_vo, price_mo, amount } })
    }
  } else {
    let category = getTagValue(item, attrs.category)
    if (category && attrs.delimiter) {
      category = category.split(attrs.delimiter)
    }
    const itemToInsert = {
      name: getTagValue(item, attrs.name),
      ean: getTagValue(item, attrs.ean),
      code: getTagValue(item, attrs.id),
      producer: getTagValue(item, attrs.producer),
      category: category,
      price_vo: price_vo,
      price_mo: price_vo,
      amount: amount,
      unit: getTagValue(item, attrs.unit),
      photo: getTagValue(item, attrs.photo),
    }
    Products.insert(itemToInsert)
  }
}

const autoUpdate = () => {
  const eshops = Eshops.find({}).fetch();
  eshops.forEach(eshop => {
    updateEshop(eshop)
  })
}

const updateEshop = (eshop) => {
  if (eshop && eshop.url && eshop.autoUpdate) {
    const attrs = eshop.attributes
    //eshop.url = 'http://localhost:5000'
    request(eshop.url, { json: true },
      Meteor.bindEnvironment((err, data, body) => {
        if (err) throw err
        parseString(body, opt, (err, json) => {
          if (err) throw err
          const items = xpath.find(json, `//${attrs.item}`);
          items.forEach(item => {
            saveItem(item, attrs)
          })
        })
        return items.length
      }));
  } else {
    return 0
  }
}

export {
  autoUpdate,
  updateEshop
}
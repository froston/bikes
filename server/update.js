import { Meteor } from 'meteor/meteor'
import { parseString } from 'xml2js'
import xpath from 'xml2js-xpath'
import request from 'request'
import { Eshops } from '../imports/api/eshops'
import { Products } from '../imports/api/products'

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
    const itemToInsert = {
      name: getTagValue(item, attrs.name),
      ean: getTagValue(item, attrs.ean),
      code: getTagValue(item, attrs.id),
      category: getTagValue(item, attrs.category),
      producer: getTagValue(item, attrs.producer),
      price_vo: price_vo,
      price_mo: price_vo,
      amount: amount,
      unit: getTagValue(item, attrs.unit),
      photo: getTagValue(item, attrs.photo),
    }
    Products.insert(itemToInsert)
  }
}

export const run = (callback) => {
  const eshops = Eshops.find({}).fetch();
  eshops.forEach(eshop => {
    const attrs = eshop.attributes
    if (eshop.url && eshop.autoUpdate) {
      // eshop.url = 'http://localhost:5000'
      request(eshop.url, { json: true },
        Meteor.bindEnvironment((err, data, body) => {
          if (err) return callback(err)
          parseString(body, opt, (err, json) => {
            const items = xpath.find(json, `//${attrs.item}`);
            items.forEach(item => {
              saveItem(item, attrs)
            })
          })
          callback(null, `Update finished. XML has ${items.length} products.`)
        }));
    }
  })
}

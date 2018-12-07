import { Meteor } from 'meteor/meteor'
import { parseString } from 'xml2js'
import xpath from 'xml2js-xpath'
import request from 'request'
import { Eshops } from '../imports/api/eshops'
import { Products } from '../imports/api/products'

const vars = {
  item: 'SHOPITEM',
  id: 'KOD',
  name: 'NAZEV',
  ean: 'EAN',
  producer: 'VYROBCE_NAZEV',
  price_vo: 'VOC_CZK_SDPH',
  price_mo: 'MOC_CZK_SDPH',
  amount: 'MNOZSTVI',
  photo: 'FOTO_SEZNAM/FOTO/URL',
  category: 'SEKCE_SEZNAM/SEKCE/SEKCE_TXT',
  unit: 'MJ',
}
const opt = {
  trim: true,
  explicitArray: false,
}

const getTagValue = (item, tagName) => xpath.find(item, `//${tagName}`)[0]

const saveItem = item => {
  const code = getTagValue(item, vars.id)
  const price_vo = getTagValue(item, vars.price_vo)
  const price_mo = getTagValue(item, vars.price_mo)
  const amount = getTagValue(item, vars.amount)
  // find existing product
  const product = Products.findOne({ code: code })
  if (product) {
    // update only if changed
    if (price_vo !== product.price_vo || price_mo !== product.price_mo || amount !== product.amount) {
      Products.update({ code }, { $set: { price_vo, price_mo, amount } })
    }
  } else {
    const itemToInsert = {
      name: getTagValue(item, vars.name),
      ean: getTagValue(item, vars.ean),
      code: getTagValue(item, vars.id),
      category: getTagValue(item, vars.category),
      producer: getTagValue(item, vars.producer),
      price_vo: price_vo,
      price_mo: price_vo,
      amount: amount,
      unit: getTagValue(item, vars.unit),
      photo: getTagValue(item, vars.photo),
    }
    Products.insert(itemToInsert)
  }
}

export const run = (callback) => {
  const eshops = Eshops.find({}).fetch();
  eshops.forEach(eshop => {
    if (eshop.url) {
      // eshop.url = 'http://localhost:5000'
      request(eshop.url, { json: true },
        Meteor.bindEnvironment((err, data, body) => {
          if (err) return callback(err)
          parseString(body, opt, (err, json) => {
            const items = xpath.find(json, `//${vars.item}`);
            items.forEach(item => {
              saveItem(item)
            })
          })
          callback(null, `Update finished. XML has ${items.length} products.`)
        }));
    }
  })
}

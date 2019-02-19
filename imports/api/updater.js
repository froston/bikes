import { Meteor } from 'meteor/meteor'
import { parseString } from 'xml2js'
import xpath from 'xml2js-xpath'
import request from 'request'
import iconv from 'iconv-lite';
import { Eshops } from './eshops'
import { Products } from './products'

const opt = {
  trim: true,
  explicitArray: false,
  ignoreAttrs: true
}

const getTagValue = (item, tagName) => xpath.find(item, `//${tagName}`)[0]

const saveItem = (eshop, item, attrs) => {
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
      return "updated"
    }
  } else {
    let category = getTagValue(item, attrs.category)
    if (category && attrs.delimiter) {
      category = category.split(attrs.delimiter)
      if (attrs.ignoreFirst) {
        category.shift()
        category[0] = category[0] && `${category[0].trim()} `
      }
    }
    const itemToInsert = {
      name: getTagValue(item, attrs.name),
      ean: getTagValue(item, attrs.ean),
      code: getTagValue(item, attrs.id),
      producer: getTagValue(item, attrs.producer),
      category: category,
      price_vo: price_vo,
      price_mo: price_mo,
      amount: amount,
      unit: getTagValue(item, attrs.unit),
      photo: getTagValue(item, attrs.photo),
      eshop
    }
    Products.insert(itemToInsert)
    return "inserted"
  }
}

const autoUpdate = () => {
  return new Promise((resolve, reject) => {
    const eshops = Eshops.find({}).fetch();
    eshops.forEach(eshop => {
      if (eshop.autoUpdate) {
        updateEshop(eshop)
      }
    })
    resolve("DONE")
  })
}

const updateEshop = (eshop) => {
  return new Promise((resolve, reject) => {
    let inserted = 0
    let updated = 0
    if (eshop && eshop.url) {
      const attrs = eshop.attributes
      //eshop.url = 'http://localhost:5000/maxibike.xml'
      const options = {
        url: eshop.url,
        encoding: 'binary'
      }
      request(options, Meteor.bindEnvironment((err, data, body) => {
        if (err) reject(err)
        body = iconv.decode(body, 'utf8')
        parseString(body, opt, (err, json) => {
          if (err) reject(err)
          const items = xpath.find(json, `//${attrs.item}`);
          items.forEach(item => {
            const res = saveItem(eshop.name, item, attrs)
            if (res === "inserted") inserted++
            if (res === "updated") updated++
          })
          resolve({ inserted, updated })
        })
      }));
    }
  })
}

export {
  autoUpdate,
  updateEshop
}
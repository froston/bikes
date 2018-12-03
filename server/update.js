import { parseString } from 'xml2js'
import request from 'request'

function nameToUpperCase(name) {
  return name.toLowerCase();
}

const opt = {
  trim: true,
  tagNameProcessors: [nameToUpperCase],
}

export const run = (url, callback) => {
  request(url, { json: true }, (err, data, body) => {
    if (err) return callback(err)
    parseString(body, opt, (err, json) => {
      const items = getItems(json)
      console.log(items)
      callback(err, json)
    })
  });
}

getItems = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (key === "SHOPITEM") {
      return obj
    } else {
      getItems(obj.key)
    }
  })
}

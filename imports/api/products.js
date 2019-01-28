import { Mongo } from 'meteor/mongo';

export const Products = new Mongo.Collection('products');

if (Meteor.isServer) {
  Products.rawCollection().createIndex({
    name: "text",
  });
  Meteor.publish('products', function (searchValue, filters) {
    let condition = {}
    if (searchValue && filters) {
      condition = { $text: { $search: searchValue }, category: { $in: [filters.catMain, filters.catSecond] } }
    }
    if (searchValue) {
      condition = { $text: { $search: searchValue } }
    }
    if (filters) {
      const cats = filters.catSecond !== '' ? [filters.catMain, filters.catSecond] : [filters.catMain]
      condition = { category: { $all: cats } }
    }
    return Products.find(condition);
  });
  Meteor.publish('product', function (_id) {
    return Products.find({ _id });
  });
}

Meteor.methods({
  'products.remove'(id) {
    Products.remove(id);
  }
})

if (Meteor.isServer) {
  Meteor.methods({
    'products.getMainCat'() {
      const cats = Meteor.wrapAsync((callback) => {
        Products.rawCollection().distinct('category', callback)
      })();
      return cats.filter(cat => !cat.startsWith(' '))
    },
    'products.getSecCat'(mainCat) {
      const cats = Meteor.wrapAsync((callback) => {
        Products.rawCollection().distinct('category', { category: { $in: [mainCat] } }, callback)
      })();
      return cats.filter(c => c !== mainCat)
    }
  })
}
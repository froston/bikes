import { Mongo } from 'meteor/mongo';

export const Products = new Mongo.Collection('products');

if (Meteor.isServer) {
  Meteor.publish('products', function (page, limit, searchValue, filters, order, orderBy) {
    let condition = {}
    if (searchValue) {
      condition = { $text: { $search: searchValue } }
    }
    if (filters) {
      const cats = filters.catSecond !== '' ? [filters.catMain, filters.catSecond] : [filters.catMain]
      condition = { category: { $all: cats } }
    }
    if (searchValue && filters) {
      condition = { $text: { $search: searchValue }, category: { $in: [filters.catMain, filters.catSecond] } }
    }
    Counts.publish(this, 'totalRows', Products.find(condition, { skip: page * limit, limit }));
    return Products.find(condition, { skip: page * limit, limit, sort: { [orderBy]: order === 'asc' ? 1 : -1 } })
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
      cats.sort((a, b) => a - b)
      return cats.filter(cat => cat && !cat.startsWith(' '))
    },
    'products.getSecCat'(mainCat) {
      const cats = Meteor.wrapAsync((callback) => {
        Products.rawCollection().distinct('category', { category: { $in: [mainCat] } }, callback)
      })();
      cats.sort((a, b) => a - b)
      return cats.filter(c => c !== mainCat)
    }
  })
}
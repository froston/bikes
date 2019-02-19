import { Mongo } from 'meteor/mongo';

export const Products = new Mongo.Collection('products');

const sortCb = (a, b) => {
  if (a.trim() < b.trim()) { return -1; }
  if (a.trim() > b.trim()) { return 1; }
  return 0;
}

if (Meteor.isServer) {
  Meteor.publish('products', function (page, limit, searchValue, filters, order, orderBy) {
    let condition = {}
    if (searchValue) {
      searchCondition = { $text: { $search: searchValue } }
      condition = searchCondition
    }
    if (filters) {
      let main = filters.catMain.length ? { category: { $in: filters.catMain } } : {}
      let sec = filters.catSecond.length ? { category: { $in: filters.catSecond } } : {}
      let third = filters.catThird.length ? { category: { $in: filters.catThird } } : {}
      filterCondition = { $and: [main, sec, third] }
      condition = filterCondition
    }
    if (searchValue && filters) {
      condition = { ...searchCondition, ...filterCondition }
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
  },
  'products.removeByEshop'(eshop) {
    Products.remove({ eshop });
  }
})

if (Meteor.isServer) {
  Meteor.methods({
    'products.getMainCat'() {
      const cats = Meteor.wrapAsync((callback) => {
        Products.rawCollection().distinct('category.0', callback)
      })();
      cats.sort(sortCb)
      return cats
    },
    'products.getSecCat'(mainCat) {
      const cats = Meteor.wrapAsync((callback) => {
        Products.rawCollection().distinct('category.1', { category: { $in: mainCat } }, callback)
      })();
      cats.sort(sortCb)
      return cats
    },
    'products.getThirdCat'(secCat) {
      const cats = Meteor.wrapAsync((callback) => {
        Products.rawCollection().distinct('category.2', { category: { $in: secCat } }, callback)
      })();
      cats.sort(sortCb)
      return cats
    }
  })
}
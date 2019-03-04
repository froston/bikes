import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Products = new Mongo.Collection('products');

const sortCb = (first, second) => {
  const a = first && first.toLowerCase()
  const b = second && second.toLowerCase()
  if (a.trim() < b.trim()) { return -1; }
  if (a.trim() > b.trim()) { return 1; }
  return 0;
}

if (Meteor.isServer) {
  Meteor.publish('products', function (page, limit, searchValue, filters, order, orderBy) {
    let condition = {}
    if (searchValue) {
      let searchCondition = { $text: { $search: searchValue } }
      condition = searchCondition
    }
    if (filters) {
      let filterArray = []
      if (filters.catMain.length) {
        filterArray.push({ category: { $in: filters.catMain } })
      }
      if (filters.catSecond.length) {
        filterArray.push({ category: { $in: filters.catSecond } })
      }
      if (filters.catThird.length) {
        filterArray.push({ category: { $in: filters.catThird } })
      }
      if (filterArray.length) {
        filterCondition = { $and: filterArray }
        condition = filterCondition
      }
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
  'products.save'(product) {
    check(product._id, String);
    Products.update(product._id, {
      code: product.code,
      name: product.name,
      ean: product.ean,
      category: product.category,
      photo: product.photo,
      producer: product.producer,
      price_vo: product.price_vo,
      price_mo: product.price_mo,
      amount: product.amount,
      unit: product.unit,
      eshop: product.eshop,
      weight: product.weight,
      url: product.url
    });
  },
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
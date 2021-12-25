function isIterable (obj) {
  // checks for null and undefined
  if (obj === null || obj === undefined) {
    return false
  }
  return typeof obj[Symbol.iterator] === 'function'
}

Array.prototype.groupByField = function ($property) {
  // check if items is iterable
  if (!isIterable(this) || typeof this === 'string') return []
  // check if each item has its property
  const isPropertyExisted = this.reduce((_res, el) => Object(el)[$property] !== undefined, Object.create(null))
  if (!isPropertyExisted) return []

  const result = this.reduce(function (result, currentValue) {
    result[currentValue[$property]] = result[currentValue[$property]] || []
    result[currentValue[$property]].push(currentValue)
    return result
  }, Object.create(null))
  return result
}

Array.prototype.makeUnique = function ($property) {
  // check if items is iterable
  if (!isIterable(this) || typeof this === 'string') return []
  // check if each item has its property
  const isPropertyExisted = this.reduce((_res, el) => Object(el)[$property] !== undefined, Object.create(null))
  if (!isPropertyExisted) return []

  var resArr = []
  this.filter(function (item) {
    var i = resArr.findIndex(x => (x[$property] == item[$property]));
    if (i <= -1) {
      resArr.push(item)
    }
    return null
  })
  return resArr
}
const { GET } = require('../helpers/consumeApi')
const { isEmptyObject } = require('../helpers/helpers')
// Methods
/**
 * @route GET /api/v1/product
 * @description Fetch products
 * @summary summary
 * @param {paramType} paramId.paramType - paramDescription
 * @param {requestBodyType} request.body - requestBodyDescription
 * @return {responseType} status - responseDescription - responseContentType
 */
const index = async (req, res) => {
  const response = await GET('/customer')
  return res.render('product/index', { data: isEmptyObject(response.data) ? null : response.data })
}

/**
 * Iterate over all Nodes
 * @param {boolean} [reverse=false] - iterate in reverse order, required if you delete nodes
 * @param {Model#GroupIteratee} cbRule - callback for Rules (can be `null` but not omitted)
 * @param {Model#GroupIteratee} [cbGroup] - callback for Groups
 * @param {object} [context] - context for callbacks
 * @returns {boolean} if the iteration has been stopped by a callback
 */
const edit = async (req, res) => {
  const reference = req.params.reference
  const response = await GET(`/customer/${reference}`)
  res.send(response.data)
  // return res.render('product/index', { data: isEmpty(response.data) ? null : response.data })
}

module.exports = {
  index,
  edit
}

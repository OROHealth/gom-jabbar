const router = require('express').Router();
const { Customer } = require('../../db/models');

router.post('/newCustomer', async (req, res, next) => {
  try {
    const { name, type } = req.body;
    if (!name || !type) return res.status(400).json({ error: 'All required' });

    const customer = await Customer.create(req.body);
    res.json({
      ...customer.dataValues,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

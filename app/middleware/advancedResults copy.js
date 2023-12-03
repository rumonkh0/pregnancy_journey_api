const { Op } = require('sequelize');

const advancedResults = (model, include) => async (req, res, next) => {
  try {
    const { select, sort, page = 1, limit = 25, ...reqQuery } = req.query;

    const query = {
      where: { ...reqQuery },
      attributes: select ? select.split(',') : undefined,
      order: sort ? sort.split(',') : [['createdAt', 'DESC']],
      offset: (page - 1) * limit,
      limit: parseInt(limit, 10)
    };

    for (const key in query.where) {
      const value = query.where[key];
      if (value[Op.gt] || value[Op.gte] || value[Op.lt] || value[Op.lte]) {
        query.where[key] = {
          ...(value[Op.gt] && { [Op.gt]: value[Op.gt] }),
          ...(value[Op.gte] && { [Op.gte]: value[Op.gte] }),
          ...(value[Op.lt] && { [Op.lt]: value[Op.lt] }),
          ...(value[Op.lte] && { [Op.lte]: value[Op.lte] })
        };
      }
      if (value[Op.in]) {
        query.where[key] = { [Op.in]: value[Op.in].split(',') };
      }
    }

    if (include) {
      query.include = include;
    }

    const results = await model.findAll(query);

    res.advancedResults = {
      success: true,
      count: results.length,
      data: results
    };

    next();
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

module.exports = advancedResults;

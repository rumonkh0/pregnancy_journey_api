const { Op } = require('sequelize');

const advancedResults = (model, include) => async (req, res, next) => {
  try {
    let where = {};

    // Copy req.query
    const { select, sort, page, limit, ...reqQuery } = req.query;

    // Filtering: Remove fields from query parameters
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]);

    // Build where clause based on reqQuery
    where = { ...reqQuery };

    // Finding resource
    const query = {
      where,
      attributes: select ? select.split(',') : undefined,
      order: sort ? sort.split(',') : [['createdAt', 'DESC']],
      offset: page ? (parseInt(page, 10) - 1) * parseInt(limit, 10) : 0,
      limit: limit ? parseInt(limit, 10) : 25
    };

    // Include associated models if needed
    if (include) {
      query.include = include;
    }

    // Executing query
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

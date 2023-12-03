const { Op } = require("sequelize");

const advancedResults = (model, include) => async (req, res, next) => {
  const reqQuery = { ...req.query };
  try {
    let where = {};

    const {
      select,
      sort,
      page: pageno,
      limit: limitno,
      ...reqQuery
    } = req.query;

    let limit = limitno ? parseInt(limitno, 10) : 10;
    let page = pageno ? parseInt(pageno, 10) : 1;

    let sortingQuery = [];
    if (sort) {
      const sortParams = sort.split(","); // Split sorting parameters by comma

      sortingQuery = sortParams.map((param) => {
        const [sortBy, sortOrder] = param.split(":"); // Split each parameter by colon
        return [sortBy, sortOrder]; // e.g., [['name', 'asc'], ['createdAt', 'desc']]
      });
    }

    // res.status(200).json({ data: req.query });

    // Filtering: Remove fields from query parameters
    // const removeFields = ["select", "sort", "page", "limit"];
    // removeFields.forEach((param) => delete reqQuery[param]);

    // Build where clause based on reqQuery
    where = { ...reqQuery };

    // Finding resource
    const query = {
      where,
      attributes: select ? select.split(",") : undefined,
      order: sort ? sortingQuery : [["createdAt", "DESC"]],
      offset: page ? (page - 1) * limit : 0,
      limit,
    };

    // Include associated models if needed
    if (include) {
      query.include = include;
    }

    // console.log(query);
    // Executing query
    const results = await model.findAll(query);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.count({ where });

    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }
    // console.log(pagination);

    res.advancedResults = {
      success: true,
      count: results.length,
      pagination,
      data: results,
    };

    next();
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

module.exports = advancedResults;

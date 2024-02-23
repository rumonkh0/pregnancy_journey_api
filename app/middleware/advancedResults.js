const { Op } = require("sequelize");
const asyncHandler = require("./async");

const advancedResults = (model, include) =>
  asyncHandler(async (req, res, next) => {
    const reqQuery = { ...req.query };

    const {
      select,
      sort,
      page: pageno,
      limit: limitno,
      search,
      field,
    } = req.query;

    // Filtering: Remove fields from query parameters
    const removeFields = ["select", "sort", "page", "limit", "field", "search"];
    removeFields.forEach((param) => delete reqQuery[param]);

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

    function convertToSequelizeQuery(parsedQuery) {
      return Object.entries(parsedQuery).reduce(
        (sequelizeQuery, [key, value]) => {
          if (
            typeof value === "object" &&
            value !== null &&
            !Array.isArray(value)
          ) {
            for (const operator in value)
              if (
                ["gt", "gte", "lt", "lte", "in", "substring"].includes(operator)
              ) {
                sequelizeQuery[key] = {
                  ...sequelizeQuery[key],
                  [Op[operator]]: value[operator],
                };
              } else {
                sequelizeQuery[key] = value;
              }
          } else {
            sequelizeQuery[key] = value;
          }
          return sequelizeQuery;
        },
        {}
      );
    }
    let where = convertToSequelizeQuery(reqQuery);
    // where = { ...where, field: { [Op.substring]: search } };
    if (search && field) {
      where[field] = { [Op.substring]: search };
    }

    // Finding resource
    const query = {
      where,
      attributes: select ? select.split(",") : undefined,
      order: sort ? sortingQuery : [["createdAt", "DESC"]],
      offset: page ? (page - 1) * limit : 0,
      limit,
    };
    // console.log(query);
    // Include associated models if needed
    if (include) {
      query.include = include;
    }

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

    res.advancedResults = {
      success: true,
      count: results.length,
      total,
      pagination,
      data: results,
    };

    next();
  });

module.exports = advancedResults;

const { Op } = require("sequelize");
const asyncHandler = require("./async");
const Reaction = require("../models/community/Reaction");
const ReactionType = require("../models/community/ReactionType");

const advancedResults = (model, include, language) =>
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
    const removeFields = [
      "select",
      "sort",
      "page",
      "limit",
      "field",
      "search",
      "lan",
    ];
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
            if (value == "") return; //delete sequelizeQuery[key];
            sequelizeQuery[key] = value;
          }
          return sequelizeQuery;
        },
        {}
      );
    }
    let where = convertToSequelizeQuery(reqQuery);
    if (model.name === "Post" && req.admin === undefined) {
      where.published = 1;
    }

    // console.log(where);
    // where = { ...where, field: { [Op.substring]: search } };
    if (search && field) {
      where[field] = { [Op.substring]: search };
    }

    // Finding resource

    var query = {
      where,
      attributes: select ? select.split(",") : undefined,
      order: sort ? sortingQuery : [["createdAt", "DESC"]],
      offset: page ? (page - 1) * limit : 0,
      limit,
    };

    // console.log(where);

    // Include associated models if needed
    if (include) {
      query.include = include;
    }

    // Executing query
    let results = await model.findAll(query);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.count({ where });

    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    } else {
      pagination.next = null;
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    } else {
      pagination.prev = null;
    }

    let newData;
    // console.log(results);
    if (language) {
      lan = req.query.lan;
      if (lan == "all") {
        results.map((obj) => {
          obj.setDataValue("title", JSON.parse(obj.title));
          obj.setDataValue("description", JSON.parse(obj.description));
        });
      } else {
        results.map((obj) => {
          obj.setDataValue(
            "title",
            obj.title &&
              (JSON.parse(obj.title)[lan]
                ? JSON.parse(obj.title)[lan]
                : JSON.parse(obj.title)["en"])
          );
          obj.setDataValue(
            "description",
            undefined
            // obj.description &&
            //   (JSON.parse(obj.description)[lan]
            //     ? JSON.parse(obj.description)[lan]
            //     : JSON.parse(obj.description)["en"])
          );
          return obj;
        });
      }
    }

    // console.log(model);
    // let nresult;
    if (model.name == "Post") {
      results = await Promise.all(
        results.map(async (post) => {
          let jpost = post.toJSON();
          req.user &&
            (jpost.react = await Reaction.findOne({
              where: { user_id: req.user.id, post_id: jpost.id },
              include: { model: ReactionType, attributes: ["type_name"] },
            }));
          return jpost;
        })
      );
    }

    // console.log(results);
    // console.log(model);

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

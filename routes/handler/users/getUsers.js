/**
 * Get user by id function
 */

/**
 * Model User init
 */

const { User } = require("../../../models");

module.exports = async (req, res) => {
  /**
   * Make filters for any condition user Id
   */

  const userIds = req.query.userIds || []; //If userIds not define, return with null array
  const sqlOptions = {
    attributs: ["id", "name", "email", "role", "profession", "avatar"],
  };

  if (userIds.length) {
    sqlOptions.where = { id: userIds };
  }

  const users = await User.findAll(sqlOptions);

  return res.json({
    status: "success",
    data: users,
  });
};

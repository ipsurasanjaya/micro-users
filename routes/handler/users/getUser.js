/**
 * Get user by id function
 */

/**
 * Model User init
 */

const { User } = require("../../../models");

module.exports = async (req, res) => {
  const id = req.params.id;

  const user = await User.findByPk(id, {
    attributes: ["id", "name", "email", "role", "profession", "avatar"],
  });

  /**
   * Return error response status 404 if user not found
   */

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  return res.json({
    status: "success",
    data: user,
  });
};

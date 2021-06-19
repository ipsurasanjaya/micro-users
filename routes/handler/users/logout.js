/**
 * Model User and RefreshToken init
 */

const { response } = require("express");
const { User, RefreshToken } = require("../../../models");

module.exports = async (req, res) => {
  /**
   * Take parameter UserId from body
   */

  const userId = req.body.user_id;

  /**
   * Check data user exist on database
   */
  const user = await User.findByPk(userId);

  /**
   * If userId is not found, return response status 404
   */

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  /**
   * If user found (user_id found on users table), delete refresh token
   */

  await RefreshToken.destroy({
    where: {
      user_id: userId,
    },
  });

  return res.json({
    status: "success",
    message: "Refresh token deleted",
  });

};

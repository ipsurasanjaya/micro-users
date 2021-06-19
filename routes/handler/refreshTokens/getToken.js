/**
 * Models RefreshToken init
 */
const { RefreshToken } = require("../../../models");

module.exports = async (req, res) => {
  /**
   * Take paramater from query params
   */

  const refreshToken = req.query.refresh_token;

  /**
   * Check refresh token exist on database
   */
  const token = await RefreshToken.findOne({
    where: {
      token: refreshToken,
    },
  });

  /**
   * If token doesnt exist, return respon 404
   */

  if (!token) {
    return res.status(400).json({
      status: "error",
      message: "Invalid token",
    });
  }

  /**
   * If token does exist on database, return status json success and data token
   */

  return res.json({
    status: "success",
    token,
  });
};

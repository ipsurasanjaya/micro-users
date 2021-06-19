/**
 * Library package init
 *
 */

const { User, RefreshToken } = require("../../../models"); //Model init

const Validator = require("fastest-validator"); //Validator init
const v = new Validator();

module.exports = async (req, res) => {
  /**
   * Request two parameter from body (user_id & refresh_tokens)
   */
  const userId = req.body.user_id;
  const refreshToken = req.body.refresh_token;

  /**
   * Create schema validation
   */
  const schema = {
    refresh_token: "string",
    user_id: "number",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  /**
   * If there's no error, check user exist in database
   */

  const user = await User.findByPk(userId);

  /**
   * If user doesnt exist, return respon 404 (Not Found)
   */
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  /**
   * If validate & user exist in database, create data to Database
   */

  const createdRefreshToken = await RefreshToken.create({
    token: refreshToken,
    user_id: userId,
  });

  return res.json({
    status: "success",
    data: {
      id: createdRefreshToken.id,
    },
  });
};

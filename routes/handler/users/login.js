/**
 * Library init
 */
const bcrypt = require("bcrypt");
const { User } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  /**
   * Creating schema validation
   */

  const schema = {
    email: "email|empy:false",
    password: "string|min:6",
  };

  const validate = v.validate(req.body, schema);
  /**
   * If validate[] variable is not null return error 400
   * Array is not null it's mean there's error in validation
   */
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  /**
   * Checking email exist on database
   */

  const user = await User.findOne({
    where: { email: req.body.email },
  });

  /**
   * If email does not exist, return response status(404)
   */
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  /**
   * Compare between hash password from database and request body password
   */
  const isValidPassword = await bcrypt.compare(
    req.body.password, //body request password
    user.password //hash password from database
  );

  /**
   * Return response 404 not found if password or email invalid
   */
  if (!isValidPassword) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  res.json({
    status: "success",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      profession: user.profession,
      avatar: user.avatar,
    },
  });
};

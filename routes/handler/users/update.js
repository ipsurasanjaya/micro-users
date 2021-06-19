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
    name: "string|empty:false",
    email: "email|empty:false",
    password: "string|min:6",
    profession: "string|optional",
    avatar: "string|optional",
  };

  /**
   * Validation check
   */
  const validate = v.validate(req.body, schema);

  /**
   * If validation not null or have an error
   * Return response status 400
   */
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  /**
   * ID User request from the parameter
   */

  const id = req.params.id;
  const user = await User.findByPk(id);

  /**
   * If user is null, return response status 404 (NOT FOUND)
   */

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User Not Found",
    });
  }

  /**
   * If user exist, do email unique verification
   */

  const email = req.body.email;
  if (email) {
    const checkEmail = await User.findOne({
      where: { email }, //Where email exist
    });

    /**
     * Check if email exist and email unique
     */

    if (checkEmail && email !== user.email) {
      return res.status(409).json({
        status: "error",
        message: "Email already exist",
      });
    }
  }

  /**
   * Hashing request password from body
   */

  const password = await bcrypt.hash(req.body.password, 10);

  /**
   * Variabel init body request [name, profession, avatar]
   */
  const { name, profession, avatar } = req.body;

  /**
   * If validation schema, email doesnt exist or duplicate, and user exist
   * Do update profile
   */

  await user.update({
    email,
    password,
    name,
    profession,
    avatar,
  });

  /**
   * If success return response success
   */

  return res.json({
    status: "success",
    data: {
      id: user.id,
      name,
      email,
      avatar,
      profession,
    },
  });
};

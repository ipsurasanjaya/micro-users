const bcrypt = require("bcrypt");
const { User } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  /**
   * Validator for register method
   * @author sura sanjaya
   */
  const schema = {
    name: "string|empty:false",
    email: "email|empty:false",
    password: "string|min:6",
    profession: "string|optional",
  };

  const validate = v.validate(req.body, schema);

  /**
   * If validate in array is not null return error 400
   * Array is not null it's mean there's error in validation
   */

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  /**
   * Find email on users table unique or not
   * If email already exist return respon status(409)
   */
  const user = await User.findOne({
    where: { email: req.body.email },
  });

  if (user) {
    return res.status(409).json({
      status: "error",
      message: "Email already exist",
    });
  }

  /**
   * Hashing password if the email is ready
   */
  const password = await bcrypt.hash(req.body.password, 10);

  /**
   * Insert data to the database method
   */
  const data = {
    password,
    name: req.body.name,
    email: req.body.email,
    profession: req.body.profession,
    role: "student",
  };

  const createdUser = await User.create(data);

  return res.json({
    status: "success",
    data: {
      id: createdUser,
    },
  });
};

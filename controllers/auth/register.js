const bcrypt = require("bcrypt");

const { User, schemas } = require("../../models/users");
const { HttpError } = require("../../utils");

const register = async (req, res, next) => {
  try {
    const { error } = schemas.registerSchema(req.body);
    if (error) {
      throw HttpError(400, "Missing required name field");
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({...req.body, password: hashPassword});
    res.status(201).json({
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
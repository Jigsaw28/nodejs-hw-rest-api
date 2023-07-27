const { User, schemas } = require("../../models/users");
const { HttpError } = require("../../utils");

const register = async (req, res, next) => {
  try {
    const { error } = schemas.registerSchema(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use")
    }
    const newUser = await User.create(req.body);
    res.status(201).json({
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

const login = (req, res, next) => {};

module.exports = {
  register,
  login,
};

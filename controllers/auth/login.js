const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, schemas } = require("../../models/users");
const { HttpError } = require("../../utils");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { error } = schemas.registerSchema(req.body);

    if (error) {
      throw HttpError(400, "Missing required name field");
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(401, "Email or password invalid");
    }

    if (!user.verify) {
      throw HttpError(401, "Email not verified");
    }

    const passwordCompare = bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      throw HttpError(401, "Email or password invalid");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;

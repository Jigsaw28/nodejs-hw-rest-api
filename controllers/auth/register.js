const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { BASE_URL } = process.env;

const { User, schemas } = require("../../models/users");
const { HttpError, sendVerivicationEmail } = require("../../utils");

const register = async (req, res, next) => {
  try {
    const { error } = schemas.registerSchema(req.body);
    if (error) {
      throw HttpError(400, "Missing required name field");
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationCode = nanoid();

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationCode,
    });
    const verifyEmail = {
      to: email,
      from: "levenko7@ukr.net",
      subject: "Verify Email",
      html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationCode}">Click verify email</a>`,
    };
    
    sendVerivicationEmail(verifyEmail);

    res.status(201).json({
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;

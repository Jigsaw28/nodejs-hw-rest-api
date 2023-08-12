const { User, schemas } = require("../../models/users");
const { HttpError, sendVerivicationEmail } = require("../../utils");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { error } = schemas.emailSchema(req.body);

    if (error) {
      throw HttpError(400, "Missing required name field");
    }
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email not found");
    }
    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }
    const verifyEmail = {
      to: email,
      from: "levenko7@ukr.net",
      subject: "Verify Email",
      html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationCode}">Click verify email</a>`,
    };
    sendVerivicationEmail(verifyEmail);
    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;

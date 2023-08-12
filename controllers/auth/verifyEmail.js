const { User, schemas } = require("../../models/users");
const { HttpError } = require("../../utils");

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationCode } = req.params;
    const user = await User.findOne({ verificationCode });
    if (!user) {
      throw HttpError(404, "User not found");
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationCode: null,
    });

    res.status(200).json({
      message: "Verification successful",
    });
  } catch (error) {
      next(error)
  }
};

module.exports = verifyEmail;

const { User, schemas } = require("../../models/users");
const { HttpError } = require("../../utils");

const updateSubscribe = async (req, res, next) => {
  try {
    const { error } = schemas.updateSubscribeSchema(req.body);
    
    if (error) {
      throw HttpError(400, "Incorrectly entered name field");
    }
    const result = await User.findOneAndUpdate(req.user, req.body, {
      new: true,
    });
    const { subscription, email } = result;
    res.json({ email, subscription });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscribe;

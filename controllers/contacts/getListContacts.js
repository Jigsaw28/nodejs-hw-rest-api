const { Contact } = require("../../models/contact");

const getListContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "email");
    if (!favorite) {
      return res.json(result);
    }
    const filter = result.filter((item) => item.favorite);
    return res.json(filter);
  } catch (error) {
    next(error);
  }
};

module.exports = getListContacts;

const {Contact} = require("../../models/contact");
const { HttpError } = require("../../utils");
const {updateFavoriteSchema} = require("../../models/contact");

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = updateFavoriteSchema(req.body);
    if (error) {
      throw HttpError(400, "missing field favorite")
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
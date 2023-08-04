const {Contact} = require("../../models/contact");
const { HttpError } = require("../../utils");
const {schema} = require("../../models/contact");

const updateContact = async (req, res, next) => {
  try {
    const { error } = schema(req.body);
    if (error) {
      throw HttpError(400, "missing required name field")
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

module.exports = updateContact;
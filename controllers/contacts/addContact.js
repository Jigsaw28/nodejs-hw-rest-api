const Contact = require("../../models/contact");
const HttpError = require("../../utils/HttpError");
const schema = require("../../models/contact");

const addContact = async (req, res, next) => {
  try {
    const { error } = schema(req.body);
    if (error) {
      throw HttpError(400, "missing required name field")
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
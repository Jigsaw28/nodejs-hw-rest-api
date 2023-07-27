const Joi = require("joi");
const Contact = require("../../models/contact");
const HttpError = require("../../utils/HttpError");

const schema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean(),
    })
    .validate(data);

const updateFavoriteSchema = (data) =>
  Joi.object()
    .keys({
      favorite: Joi.boolean().required(),
    })
    .validate(data);

const getListContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

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

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId)
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json({message:"contact deleted"})
  } catch (error) {
    next(error)
  }
}

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

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = updateFavoriteSchema(req.body);
    console.log(error);
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

module.exports = {
  getListContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};

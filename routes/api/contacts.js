const express = require("express");

const router = express.Router();
const {getListContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact} = require("../../controllers/contacts")

const  isValidId  = require("../../middlewares/isValidId");

router.get("/", getListContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", addContact);

router.delete("/:contactId", isValidId, removeContact);

router.put("/:contactId", isValidId, updateContact);

router.patch("/:contactId/favorite", isValidId, updateStatusContact);

module.exports = router;

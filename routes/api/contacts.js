const express = require("express");

const router = express.Router();
const {getListContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact} = require("../../controllers/contacts")

const { isValidId, auth }  = require("../../middlewares");

router.get("/", auth, getListContacts);

router.get("/:contactId", auth, isValidId, getContactById);

router.post("/", auth, addContact);

router.delete("/:contactId", auth, isValidId, removeContact);

router.put("/:contactId", auth, isValidId, updateContact);

router.patch("/:contactId/favorite", auth, isValidId, updateStatusContact);

module.exports = router;

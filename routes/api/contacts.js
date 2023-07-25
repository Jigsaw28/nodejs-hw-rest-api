const express = require("express");

const router = express.Router();
const contacts = require("../../controllers/controllers")

const  isValidId  = require("../../middlewares/isValidId");

router.get("/", contacts.getListContacts);

router.get("/:contactId", isValidId, contacts.getContactById);

router.post("/", contacts.addContact);

router.delete("/:contactId", isValidId, contacts.removeContact);

router.put("/:contactId", isValidId, contacts.updateContact);

router.patch("/:contactId/favorite", isValidId, contacts.updateStatusContact);

module.exports = router;

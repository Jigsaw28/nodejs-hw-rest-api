const express = require("express");

const router = express.Router();
const contacts = require("../../controllers/controllers")

router.get("/", contacts.getListContacts);

router.get("/:contactId", contacts.getContactById);

router.post("/", contacts.addContact);

router.delete("/:contactId", contacts.removeContact);

router.put("/:contactId", contacts.updateContact);

module.exports = router;

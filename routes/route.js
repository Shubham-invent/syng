var express = require("express");

const OrganizationController = require("../controllers/OrganizationController");
const { route } = require("./api");

var router = express.Router();

router.post("/createOrganization", OrganizationController.createOrganization);
router.get("/getAllOrganization", OrganizationController.getAllOrganization);
router.get(
  "/getOrganizationById/:id",
  OrganizationController.getOrganizationById
);
router.put(
  "/updateOrganizationById/:id",
  OrganizationController.updateOrganizationById
);
router.delete(
  "/deleteOrganizationById/:id",
  OrganizationController.deleteOrganizationById
);

module.exports = router;

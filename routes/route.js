var express = require("express");

const OrganizationController = require("../controllers/OrganizationController");
const { route } = require("./api");

var router = express.Router();

router.post("/createOrganization", OrganizationController.createOrganization);
router.get("/organizations", OrganizationController.getAllOrganization);
router.get("/organizations/:id", OrganizationController.getOrganizationById);
router.put("/organizations/:id", OrganizationController.updateOrganizationById);
router.delete(
  "/organizations/:id",
  OrganizationController.deleteOrganizationById
);

module.exports = router;

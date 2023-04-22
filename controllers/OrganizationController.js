const apiResponse = require("../helpers/apiResponse");
const { Organizations } = require("../models/OrganizationModel");

exports.createOrganization = [
  // Create a new organization
  async (req, res) => {
    try {
      const { name } = req.body;
      console.log("name", name);
      const organization = await Organizations.create({
        name: name,
      });
      apiResponse.successResponse(organization);
    } catch (error) {
      apiResponse.asIsResponse(req, res, error);
    }
  },
];

exports.getAllOrganization = [
  async (req, res) => {
    try {
      const organization = await Organizations.findAll();
      apiResponse.successResponse(organization);
    } catch (error) {
      apiResponse.asIsResponse(req, res, error);
    }
  },
];

exports.getOrganizationById = [
  // Create a new organization
  async (req, res) => {
    try {
      const organization = await Organizations.findByPk(req.params.id);
      if (!organization) throw new Error("Organizations not found");
      apiResponse.successResponse(organization);
    } catch (error) {
      apiResponse.asIsResponse(req, res, error);
    }
  },
];

exports.updateOrganizationById = [
  // Create a new organization
  async (req, res) => {
    try {
      const { name } = req.body;
      const organization = await Organizations.findByPk(req.params.id);
      if (!organization) throw new Error("Organizations not found");
      await organization.update({ name });
      apiResponse.successResponse(organization);
    } catch (error) {
      apiResponse.asIsResponse(req, res, error);
    }
  },
];

exports.deleteOrganizationById = [
  async (req, res) => {
    try {
      const organization = await Organizations.findByPk(req.params.id);
      if (!organization) throw new Error("Organizations not found");
      await organization.destroy();
      apiResponse.successResponse(organization);
    } catch (error) {
      apiResponse.asIsResponse(req, res, error);
    }
  },
];

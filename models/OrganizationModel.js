const { DataTypes } = require("sequelize");
const sequelize = require("../bin/sequelize");

const Organizations = sequelize.define("Organizations", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Property = sequelize.define("Property", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Region = sequelize.define("Region", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Field = sequelize.define("Field", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  geometry: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const CropCycle = sequelize.define("CropCycle", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Crop = sequelize.define("Crop", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const CropCycleField = sequelize.define("CropCycleField", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

const CropCycleProperty = sequelize.define("CropCycleProperty", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

const OauthUsers = sequelize.define("OauthUsers", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define relationships
Organizations.hasMany(Property);
Property.belongsTo(Organizations);

Property.hasMany(Region);
Region.belongsTo(Property);

Region.hasMany(Region, { as: "Children" });
Region.belongsTo(Region, { as: "Parent" });

Region.hasMany(Field);
Field.belongsTo(Region);

Property.belongsToMany(CropCycle, { through: CropCycleProperty });
CropCycle.belongsToMany(Property, { through: CropCycleProperty });

CropCycle.belongsToMany(Field, { through: CropCycleField });
Field.belongsToMany(CropCycle, { through: CropCycleField });

CropCycle.belongsTo(Crop);
Crop.hasMany(CropCycle);

module.exports = {
  Organizations,
  Property,
  Region,
  Field,
  CropCycle,
  Crop,
  CropCycleField,
  CropCycleProperty,
  OauthUsers,
};

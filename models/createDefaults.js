const ConstructionCompany = require("./property/constuction-company");
const PropertyComplex = require("./property/property-complex-model");
const PropertyType = require("./property/property-type-model");
const DealType = require("./property/deal-type-model");
const PropertyCategory = require("./property/property-category-model");
const Currency = require("./property/currency-model");
const Condition = require("./property/condition-model");
const Structure = require("./property/structure-model");
const Region = require("./property/region-model");
const City = require("./property/city-model");
const District = require("./property/district-model");
const Heating = require("./property/heating-model");


async function createDefaultConstructionCompanies() {
  await ConstructionCompany.createDefaultConstructionCompanies();
  await PropertyComplex.createDefaultPropertyComplexes();
  await PropertyType.createDefaultPropertyTypes();
  await DealType.createDefaultDealTypes();
  await PropertyCategory.createDefaultPropertyCategories();
  await Currency.createDefaultCurrencies();
  await Condition.createDefaultConditions();
  await Structure.createDefaultStructures();
  await Region.createDefaultRegions();
  await City.createDefaultCities();
  await District.createDefaultDistricts();
  await Heating.createDefaultHeatings();
  
  console.log("Default construction companies created.");
}

module.exports = createDefaultConstructionCompanies;
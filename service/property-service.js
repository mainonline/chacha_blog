const PropertyModel = require("../models/property/property-model");
const ApiError = require("../exceptions/api-error");
const cloudinary = require("../cloudinary");
const fs = require("fs");


class PropertyService {
  // create property
  async createProperty(data, user, files) {
    const property = await PropertyModel.create({ ...data, user: user.id });

    if (files && files.length > 0) {
      const urls = [];
      for (const file of files) {
        const { path } = file;
        const { url, id } = await cloudinary.uploads(path, "estate");
        urls.push({ url, id });
        fs.unlinkSync(path);
      }
      property.images = urls;
    }
    await property.save();

    await property.populate("city");
    return property;
  }

  // get all properties
  async getAllProperties() {
    return await PropertyModel.find();
  }

  // get property by id
  async getPropertyById(id) {
    return await PropertyModel.findById(id);
  }

  // delete property by id
  async deletePropertyById(id) {
    return await PropertyModel.findByIdAndDelete(id);
  }
}

module.exports = new PropertyService();

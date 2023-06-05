const propertyService = require("../service/property-service");
const ApiError = require("../exceptions/api-error");

class PropertyController {
  async createProperty(req, res, next) {
    try {
      const user = req.user;
      const data = req.body;
      const files = req.files;

      const property = await propertyService.createProperty(data, user, files);
      res.json(property);
    } catch (err) {
      console.error(err);
      next(err); 
    }
  }

  async updateProperty(req, res, next) {
    // try {
    //   const data = req.body;
    //   const user = req.user;
    //   const { id } = req.params;
    //   const files = req.files;

    //   const singleProperty = await propertyService.getOne(id);

    //   if (singleProperty.author.toString() !== user.id) {
    //     return next(ApiError.Forbidden("You are not the author of this Property"));
    //   }

    //   const updatedProperty = await propertyService.update(id, data, files);
    //   res.json(updatedProperty);
    // } catch (err) {
    //   console.error(err);
    //   next(err);
    // }
  }

  async patchProperty(req, res, next) {
    // try {
    //   const data = req.body;
    //   const user = req.user;
    //   const { id } = req.params;
    //   const files = req.files;

    //   const singleProperty = await propertyService.getOne(id);

    //   if (singleProperty.author.toString() !== user.id) {
    //     return next(ApiError.Forbidden("You are not the author of this Property"));
    //   }

    //   const updatedProperty = await propertyService.patch(id, data, files);
    //   res.json(updatedProperty);
    // } catch (err) {
    //   console.error(err);
    //   next(err);
    // }
  }

  async getAllPropertys(req, res, next) {
    // try {
    //   const page = parseInt(req.query.page) || 1;
    //   const limit = parseInt(req.query.limit) || 20;
    //   const properties = await propertyService.getAll(page, limit);
    //   res.json(properties);
    // } catch (err) {
    //   console.error(err);
    //   next(err);
    // }
  }

  async getOneProperty(req, res, next) {
    // try {
    //   const { id } = req.params;
    //   const property = await propertyService.getOne(id);
    //   res.json(property);
    // } catch (err) {
    //   console.error(err);
    //   next(err);
    // }
  }

  async deleteProperty(req, res, next) {
    // try {
    //   const { id } = req.params;
    //   const user = req.user;

    //   const property = await propertyService.getOne(id);
    //   if (property.author.toString() !== user.id) {
    //     return next(ApiError.Forbidden("You are not the author of this Property"));
    //   }
    //   await propertyService.delete(id);
    //   res.json({ message: "Property deleted" });
    // } catch (err) {
    //   console.error(err);
    //   next(err);
    // }
  }
}

module.exports = new PropertyController();

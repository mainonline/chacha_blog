const { Schema, model } = require("mongoose");

const PropertyType = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

// create default property types
PropertyType.statics.createDefaultPropertyTypes = async function () {
  const propertyTypes = [
    {
      title: "Квартира",
      description: "Жилое помещение в многоквартирном доме",
    },
    {
      title: "Комната",
      description: "Жилое помещение в многоквартирном доме",
    },
    {
      title: "Дом",
      description: "Жилое помещение в многоквартирном доме",
    },
    {
      title: "Дача",
      description: "Жилое помещение в многоквартирном доме",
    },
    {
      title: "Участок",
      description: "Жилое помещение в многоквартирном доме",
    },
    {
      title: "Гараж",
      description: "Жилое помещение в многоквартирном доме",
    },
  ];

  for (let i = 0; i < propertyTypes.length; i++) {
    const propertyType = await this.findOne({
      title: propertyTypes[i].title,
    });
    if (!propertyType) {
      await this.create(propertyTypes[i]);
    }
  }
};

module.exports = model("PropertyType", PropertyType);

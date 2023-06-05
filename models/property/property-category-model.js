const { Schema, model } = require("mongoose");

const PropertyCategory = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

// create default PropertyCategories

PropertyCategory.statics.createDefaultPropertyCategories = async function () {
  const propertyCategories = [
    {
      title: "102 - серия",
      description: "102 - серия",
    },
    {
      title: "103 - серия",
      description: "103 - серия",
    },
    {
      title: "104 - серия",
      description: "104 - серия",
    },
    {
      title: "105 - серия",
      description: "105 - серия",
    },
    {
      title: "106 - серия",
      description: "106 - серия",
    },
  ];

  for (let i = 0; i < propertyCategories.length; i++) {
    const propertyCategory = await this.findOne({
      title: propertyCategories[i].title,
    });
    if (!propertyCategory) {
      await this.create(propertyCategories[i]);
    }
  }
};

module.exports = model("PropertyCategory", PropertyCategory);

const { Schema, model } = require("mongoose");

const PropertyComplex = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    constructionCompany: {
      type: Schema.Types.ObjectId,
      ref: "ConstructionCompany",
    },
  },
  { timestamps: true }
);

// create default property complexes
PropertyComplex.statics.createDefaultPropertyComplexes = async function () {
  const constructionCompanies = await model("ConstructionCompany").find();

  const propertyComplexes = [
    {
      title: "ЖК Лесной",
      description: "Жилой комплекс Лесной",
      constructionCompany: constructionCompanies[0]._id,
    },
    {
      title: "ЖК Лесной 2",
      description: "Жилой комплекс Лесной 2",
      constructionCompany: constructionCompanies[0]._id,
    },
    {
      title: "ЖК Лесной 3",
      description: "Жилой комплекс Лесной 3",
      constructionCompany: constructionCompanies[0]._id,
    },
    {
      title: "ЖК Лесной 4",
      description: "Жилой комплекс Лесной 4",
      constructionCompany: constructionCompanies[0]._id,
    },
  ];

  for (let i = 0; i < propertyComplexes.length; i++) {
    const propertyComplex = await this.findOne({
      title: propertyComplexes[i].title,
    });
    if (!propertyComplex) {
      await this.create(propertyComplexes[i]);
    }
  }
};

module.exports = model("PropertyComplex", PropertyComplex);

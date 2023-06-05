const { Schema, model } = require("mongoose");

const ConstructionCompany = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    complexes: [{ type: Schema.Types.ObjectId, ref: "PropertyComplex" }],
  },
  { timestamps: true }
);

// create default construction companies
ConstructionCompany.statics.createDefaultConstructionCompanies =
  async function () {
    const constructionCompanies = [
      {
        title: "Elite Group",
        description: "Elite Group",
      },
      {
        title: "Elite Group 2",
        description: "Elite Group 2",
      },
      {
        title: "Elite Group 3",
        description: "Elite Group 3",
      },
      {
        title: "Elite Group 4",
        description: "Elite Group 4",
      },
      {
        title: "Elite Group 5",
        description: "Elite Group 5",
      },
    ];

    for (let i = 0; i < constructionCompanies.length; i++) {
      const constructionCompany = await this.findOne({
        title: constructionCompanies[i].title,
      });
      if (!constructionCompany) {
        await this.create(constructionCompanies[i]);
      }
    }
  };

module.exports = model("ConstructionCompany", ConstructionCompany);

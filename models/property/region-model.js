const { Schema, model } = require("mongoose");

const Region = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

// create default Regions
Region.statics.createDefaultRegions = async function () {
  const regions = [
    {
      title: "Баткенская область",
      description: "Баткенская область",
    },
    {
      title: "Джалал-Абадская область",
      description: "Джалал-Абадская область",
    },
    {
      title: "Иссык-Кульская область",
      description: "Иссык-Кульская область",
    },
    {
      title: "Нарынская область",
      description: "Нарынская область",
    },
    {
      title: "Ошская область",
      description: "Ошская область",
    },
    {
      title: "Таласская область",
      description: "Таласская область",
    },
    {
      title: "г.Бишкек",
      description: "г.Бишкек",
    },
  ];

  for (let i = 0; i < regions.length; i++) {
    const region = await this.findOne({
      title: regions[i].title,
    });
    if (!region) {
      await this.create(regions[i]);
    }
  }
};

module.exports = model("Region", Region);

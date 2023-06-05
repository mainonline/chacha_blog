const { Schema, model } = require("mongoose");

const City = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

// create default cities
City.statics.createDefaultCities = async function () {
  const cities = [
    {
      title: "Алматы",
      description: "Алматы",
    },
    {
      title: "Нур-Султан",
      description: "Нур-Султан",
    },
    {
      title: "Шымкент",
      description: "Шымкент",
    },
    {
      title: "Актобе",
      description: "Актобе",
    },
    {
      title: "Атырау",
      description: "Атырау",
    },
    {
      title: "Караганда",
      description: "Караганда",
    },
  ];

  for (let i = 0; i < cities.length; i++) {
    const city = await this.findOne({
      title: cities[i].title,
    });
    if (!city) {
      await this.create(cities[i]);
    }
  }
};

module.exports = model("City", City);

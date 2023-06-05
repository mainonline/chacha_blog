const { Schema, model } = require("mongoose");

const Heating = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);


// create default heating
Heating.statics.createDefaultHeatings = async function () {
  const heatings = [
    {
      title: "Центральное",
      description: "Центральное",
    },
    {
      title: "Индивидуальное",
      description: "Индивидуальное",
    },
    {
      title: "Нет",
      description: "Нет",
    },
  ];

  for (let i = 0; i < heatings.length; i++) {
    const heating = await this.findOne({
      title: heatings[i].title,
    });
    if (!heating) {
      await this.create(heatings[i]);
    }
  }
};

  module.exports = model("Heating", Heating);

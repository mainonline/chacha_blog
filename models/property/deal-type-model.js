const { Schema, model } = require("mongoose");

const DealType = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

// create default deal types
DealType.statics.createDefaultDealTypes = async function () {
  const dealTypes = [
    {
      title: "Продажа",
      description: "Продажа",
    },
    {
      title: "Аренда",
      description: "Аренда",
    },
  ];

  for (let i = 0; i < dealTypes.length; i++) {
    const dealType = await this.findOne({
      title: dealTypes[i].title,
    });
    if (!dealType) {
      await this.create(dealTypes[i]);
    }
  }
};

module.exports = model("DealType", DealType);

const { Schema, model } = require("mongoose");

const Currency = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
  },
);

// create default Currencies
Currency.statics.createDefaultCurrencies = async function () {
  const currencies = [
    {
      title: "USD",
      description: "USD",
    },
    {
      title: "EUR",
      description: "EUR",
    },
    {
      title: "KGS",
      description: "KGS",
    },
  ];

  for (let i = 0; i < currencies.length; i++) {
    const currency = await this.findOne({
      title: currencies[i].title,
    });
    if (!currency) {
      await this.create(currencies[i]);
    }
  }
};

module.exports = model("Currency", Currency);

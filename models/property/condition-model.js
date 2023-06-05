const { Schema, model } = require("mongoose");

const Condition = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

// create default conditions

Condition.statics.createDefaultConditions = async function () {
  const conditions = [
    {
      title: "Новостройка",
      description: "Новостройка",
    },
    {
      title: "Вторичка",
      description: "Вторичка",
    },
    {
      title: "Строящийся дом",
      description: "Строящийся дом",
    },
    {
      title: "Дом в эксплуатации",
      description: "Дом в эксплуатации",
    },
    {
      title: "Дом в сносе",
      description: "Дом в сносе",
    },
  ];

  for (let i = 0; i < conditions.length; i++) {
    const condition = await this.findOne({
      title: conditions[i].title,
    });
    if (!condition) {
      await this.create(conditions[i]);
    }
  }
};

module.exports = model("Condition", Condition);

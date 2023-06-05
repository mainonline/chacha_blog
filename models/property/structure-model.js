const { Schema, model } = require("mongoose");

const Structure = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

// create default structures

Structure.statics.createDefaultStructures = async function () {
  const structures = [
    {
      title: "Кирпичный",
      description: "Кирпичный",
    },
    {
      title: "Панельный",
      description: "Панельный",
    },
    {
      title: "Монолитный",
      description: "Монолитный",
    },
    {
      title: "Блочный",
      description: "Блочный",
    },
    {
      title: "Деревянный",
      description: "Деревянный",
    },
  ];

  for (let i = 0; i < structures.length; i++) {
    const structure = await this.findOne({
      title: structures[i].title,
    });
    if (!structure) {
      await this.create(structures[i]);
    }
  }
};

module.exports = model("Structure", Structure);

const { Schema, model } = require("mongoose");

const District = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

// create default Districts
District.statics.createDefaultDistricts = async function () {
  const districts = [
    {
      title: "Наурызбайский",
      description: "Наурызбайский",
    },
    {
      title: "Алмалинский",
      description: "Алмалинский",
    },
    {
      title: "Ауэзовский",
      description: "Ауэзовский",
    },
    {
      title: "Бостандыкский",
      description: "Бостандыкский",
    },
  ];

  for (let i = 0; i < districts.length; i++) {
    const district = await this.findOne({
      title: districts[i].title,
    });
    if (!district) {
      await this.create(districts[i]);
    }
  }
};

module.exports = model("District", District);

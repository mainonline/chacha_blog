const { Schema, model, mongoose } = require("mongoose");

const Property = new Schema(
  {
    city: { type: Schema.Types.ObjectId, ref: "City", required: true },
    region: { type: Schema.Types.ObjectId, ref: "Region", required: true },
    currency: { type: Schema.Types.ObjectId, ref: "Currency", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    heating: { type: Schema.Types.ObjectId, ref: "Heating", required: true },
    district: { type: Schema.Types.ObjectId, ref: "District", required: true },
    condition: { type: Schema.Types.ObjectId, ref: "Condition", required: true },
    property_type: { type: Schema.Types.ObjectId, ref: "PropertyType", required: true },
    structure_type: { type: Schema.Types.ObjectId, ref: "StructureType", required: true },
    deal_type: { type: Schema.Types.ObjectId, ref: "DealType", required: true },
    category: { type: Schema.Types.ObjectId, ref: "PropertyCategory", required: true },
    title: { type: String, required: true },
    description: {
      type: String,
      required: true,
    },
    construction_date: {
      type: Date,
      default: null,
    },
    floor: {
      type: Number,
      default: 1,
    },
    floor_total: {
      type: Number,
      default: 1,
    },
    street: {
      type: String,
      required: true,
    },
    house_number: {
      type: String,
      required: true,
    },
    intersection: {
      type: String,
      default: "",
    },
    gas_supply: {
      type: Boolean,
      default: false,
    },
    water_supply: {
      type: Boolean,
      default: false,
    },
    electricity_supply: {
      type: Boolean,
      default: false,
    },
    sewerage_supply: {
      type: Boolean,
      default: false,
    },
    toilet: {
      type: String,
      default: "",
    },
    internet: {
      type: Boolean,
      default: false,
    },
    balcony: {
      type: Boolean,
      default: false,
    },
    front_door: {
      type: String,
      default: "",
    },
    parking: {
      type: Boolean,
      default: false,
    },
    floor_type: {
      type: String,
      default: "",
    },
    room_height: {
      type: Number,
      default: null,
    },
    security: {
      type: Array,
      default: [],
    },
    other: {
      type: Array,
      default: [],
    },
    documents: {
      type: Array,
      default: [],
    },
    price: {
      type: Number,
      required: true,
    },
    price_for: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      default: [],
    },
    is_agent: {
      type: Boolean,
      default: false,
    },
    is_owner: {
      type: Boolean,
      default: false,
    },
    can_call: {
      type: Boolean,
      default: false,
    },
    can_comment: {
      type: Boolean,
      default: false,
    },
    can_exchange: {
      type: Boolean,
      default: false,
    },
    exchange_for: {
      type: String,
      default: "",
    },
    can_mortgage: {
      type: Boolean,
      default: false,
    },
    long_payment: {
      type: Boolean,
      default: false,
    },
    rooms_number: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = model("Property", Property);

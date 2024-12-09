const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
    username: { type: String, required: true },
    brand: { type: String, required: true },
    brandmodel: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: String, required: true },
    productImages: { type: [String], required: true },
    DatePicker: { type: String, required: true },
});

const sellModel = mongoose.model("Data", DataSchema);

module.exports = sellModel;

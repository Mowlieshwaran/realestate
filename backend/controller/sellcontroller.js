
const sellModel = require("../modal/sellmodal");

const dotenv = require('dotenv');

dotenv.config()
module.exports = {
    saveData: async (req, res) => {
        const { username, brand, brandmodel, description, location, price, productImages, DatePicker } = req.body;

        try {


            const newData = new sellModel({
                username, brand, brandmodel, description, location, price, productImages, DatePicker
            })

            await newData.save();
            res.status(201).send(newData);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error saving data.", error);
        }
    },
    getData: async (req, res) => {
        
        try {
            const files = await sellModel.find()
          res.json({  success: true,files});
        } catch (error) {
            console.error(error);
            res.status(500).send("Error saving data.", error);
        }
    },


}
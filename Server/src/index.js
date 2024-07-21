const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dummydata = require('./stocks.js');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/StockPriceTracker", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const stockSchema = new mongoose.Schema({
	company: String,
	price: Number,
	num: Number
});

const Stock = mongoose.model("Stock", stockSchema);

// async function storedata(){
// 	for(let i = 0; i < dummydata.length; i++){
// 		await Stock.create(dummydata[i])
// 	}
// }
// storedata()
async function updatedata() {
	let stocks = await Stock.find();
	let num = Math.floor(Math.random() * 10) + 1;
	for (let i = 0; i < stocks.length; i++) {
		if (stocks[i].price > 500) {
			stocks[i].price = stocks[i].price - num;
			stocks[i].num = -(num);
		}
		else {
			stocks[i].price = stocks[i].price + num;
			stocks[i].num = num;
		}
		await Stock.updateOne({ _id: stocks[i]._id }, { price: stocks[i].price, num: stocks[i].num })
	}



}
app.put("/stocks", async (req, res) => {

	try {
		await updatedata()
		const stocks = await Stock.find();
		console.log(stocks)
		res.json(stocks);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

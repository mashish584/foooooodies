const routes = require("next-routes");

module.exports = routes()
	.add("bucket")
	.add("addFood", "/add/food", "/add/food")
	.add("food", "/food/:id", "food")
	.add("foods", "/foods/:page", "foods")
	.add("index")
	.add("orders")
	.add("signin")
	.add("signup");

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("\n ------------------------------------")
  console.log("  Welcome to BAMAZON online bazaar!\n  You are customer #" + connection.threadId );
  console.log("------------------------------------\n ")
  readProducts() 
});

function readProducts() {
	var query = "Select * FROM products";
	connection.query(query, function(err, res) {
		if (err) throw err;
		console.log("----------------------------------------------")
		for (var i = 0; i < res.length; i++) {
			console.log("ID: " + res[i].item_id + " - " +res[i].product_name + " - Price: " + res[i].price + " - quantity: " + res[i].stock_quantity);
	}
	console.log("----------------------------------------------\n")
    selection();
});
};

function selection() {
	inquirer.prompt([
		
		{
			type: "input",
			name: "item_id",
			message: "Enter the Item ID for the product you would like to purchase.",
		},{
			type: "input",
			name: "quantity",
			message: "How many would you like to buy?",
		}

	]).then(function(input) {

		var item = input.item_id;
		var quantity = input.quantity;
		var queryStr = "SELECT * FROM products WHERE ?";

		connection.query(queryStr, {item_id: item}, function(err, data) {

		if (data.length > 0) {

			var productData = data[0];

			if (quantity <= productData.stock_quantity) {

				var updateQueryStr = "UPDATE products SET stock_quantity = " + (productData.stock_quantity - quantity) + " WHERE item_id = " + item;

				connection.query(updateQueryStr, function() {

					setTimeout(function () {
						console.log("\n\n*a total of $" + productData.price * quantity + " will automatically be charged to your credit card*\n\n\n");
					
					}, 1500);

					setTimeout(function () {
						readProducts() 
					}, 3500);

				})

			} else { 
				console.log("\n------------------------------------")
				console.log("*Not enough stock on, please try again*");
				console.log("------------------------------------\n")	
				readProducts()		
		}

	}
	})
})
}


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
  listItems() 
});

var listItems = function() {
	var query = "Select * FROM products";
	connection.query(query, function(err, res) {
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			console.log("ID: " + res[i].id + " || " +res[i].product_name + " || Price: " + res[i].price);
    }
    console.log("\n");
    pick();
	});
};

function pick() {
  inquirer
    .prompt({
      name: "customer_search",
      type: "input",
      message: "Enter the ID of the item you would like to buy",
    })
    .then(function(answer) {
      var query = "SELECT * FROM id WHERE ?";
      connection.query(query, { products: answer.id }, function(err, res) {
        if (err) throw err;
          console.log(res.product_name + res.department_name + res.price + res,stock_quantity);
      });
      qty();
    });
}
const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require('cli-table');

// let productList = {
//     id: 'item_id',
//     name: 'product_name',
//     department: 'department_name',
//     price: 'price',
//     quantity: 'stock_quantity'
// };

const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "WhereintheworldisBunny87",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    displayItems();
});

function displayItems() {
	connection.query('SELECT * FROM products', function(err, res){
		if (err) throw err;
		console.log('There\'s been an error');

		for(i=0;i<res.length;i++){
			console.log('Item ID:' + res[i].item_id + '  Product Name: ' + res[i].product_name + '  Department: ' + res[i].department_id + '  Price: ' + '$' + res[i].price  +'  Quantity Available: ' + res[i].stock_quantity )
		}
		console.log('=================================================');
    });
    purchaseItem();
    connection.end();
};

function purchaseItem(){
// inquirer.prompt([
//     {
//       type: "input",
//       name: "custProduct",
//       message: "What product would you like to purchase? Please enter the Item ID."
//     },
//     {
//       type: "input",
//       name: "custAmount",
//       message: "How many would you like to purchase?"
//     }
// ]).then(function(answers){
//     let custProduct= answers.custProduct;
//     let custAmount= answers.custAmount;
// });
};

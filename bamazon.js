const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require('cli-table');

let productList = {
    id: 'item_id',
    name: 'product_name',
    department: 'department_name',
    price: 'price',
    quantity: 'stock_quantity'
};

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
    connection.query('SELECT * FROM products', function (err, res) {
        if (err){
        console.log('There\'s been an error')
        }else {

            for (i = 0; i < res.length; i++) {
                console.log('Item ID:' + res[i].item_id + '  Product Name: ' + res[i].product_name + '  Department: ' + res[i].department_id + '  Price: ' + '$' + res[i].price + '  Quantity Available: ' + res[i].stock_quantity)
            }
            console.log('=================================================');

            purchaseItem(res);
        };
    });
};

function purchaseItem(data) {

    inquirer.prompt([
        {
            type: "input",
            name: "custProduct",
            message: "What product would you like to purchase? Please enter the Item ID."
        },
        {
            type: "input",
            name: "custAmount",
            message: "How many would you like to purchase?"
        }
    ]).then(function (res) {

        let productId = res.custProduct;
        let quantity = res.custAmount;
        let dataItem = data;

        for (let i = 0; i < data.length; i++) {
            if (data[i].item_id == productId) {
                dataItem = data[i]
            }
        };
        if(!dataItem){
            return console.log('Not item found with that ID');
        }else{
            (quantity <= dataItem)
            console.log("Your item is instock!")

            connection.query('UPDATE products set stock_quantity = ' + (dataItem.stock_quantity - quantity) + ' WHERE item_id = ' + productId, function(err, ){
                console.log("Your order has been placed");
                console.log("Your order total is $" + dataItem.price * quantity + "\n");

                inquirer.prompt([
                    {
                        type: "list",
                        name: "continue",
                        message: "Would you like to continue shopping or leave the store?",
                        choices: ["Yes, I want to keep shopping!", "No, I already have everything I need."]
                    }
                ]).then(function(res){
                    if (res.continue == "Yes, I want to keep shopping!"){
                        displayItems();
                    }else{
                        connection.end();
                    };
                });    

            });


        };


    });

};

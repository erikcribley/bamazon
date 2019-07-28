//dependencies
let mysql = require('mysql')
let inquirer = require('inquirer')

//connection
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon'
})

//reduce stock from database, returning total price
function reduceStock (id, units, r) {
    let query = "UPDATE products SET stock_quantity =? WHERE item_id=?"
    connection.query(query, [r.stock_quantity - units, id], function(err, res) {
        if (err) {
            throw err
        }
        let price = r.price * units
        console.log("Total Price: " + price)
        connection.end()
    })
}

//checking quantity in database
function checkStock (id, units) {
    let query = "SELECT * FROM products WHERE item_id =?"
    connection.query(query, id , function(err, res) {
        if (err) {
            throw err
        }
        if (units <= res[0].stock_quantity) {
           reduceStock(id, units, res[0])
        } else {
            console.log("Insufficient Quantity!")
            connection.end()
        }
    })
}

//inquirer
function makePurchase () {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter the ID number of the item you'd like to purchase",
                name: "itemID"
            },
            {
                type: "input",
                message: "How many units would you like to purchase?",
                name: "unitsSold"
            }
        ])
        .then(function(answer) {
            checkStock(answer.itemID, answer.unitsSold)
        })
}

//display all items
function displayAll () {
    let query = "SELECT * FROM products"
    connection.query(query, function(err, res) {
        if (err) {
            throw err
        }
        for (i = 0; i < res.length; i++) {
            console.log(
                res[i].item_id + " | " + 
                res[i].product_name + " | " +
                res[i].department_name + " | " +
                res[i].price + " | " +
                res[i].stock_quantity
            )
        }
        makePurchase()
    })
}

//run
connection.connect(function(err) {
    if (err) {
        throw err
    }
    console.log("connected as id " + connection.threadId)
    displayAll()
})
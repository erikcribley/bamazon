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

//inquirer
function makePurchase (){
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter the ID number of the item you'd like to purchase",
                name: "item-id"
            },
            {
                type: "input",
                message: "How many units would you like to purchase?",
                name: "units-sold"
            }
        ])
}

//display all items
function displayAll () {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) {
            throw err
        }
        console.log(res)
        // for (i = 0; i = res.length; i++) {
        //     console.log(res[i].item_id + " | " + 
        //                 res[i].product_name + " | " +
        //                 res[i].department_name + " | " +
        //                 res[i].price + " | " +
        //                 res[i].stock_quantity)
        // }
        makePurchase()
    })
}

//check connection
connection.connect(function(err) {
    if (err) {
        throw err
    }
    console.log("connected as id " + connection.threadId)
    displayAll()
})
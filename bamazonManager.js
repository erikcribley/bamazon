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

function viewProducts () {
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
    })
}

function viewLow () {
    let query = "SELECT * FROM products WHERE stock_quantity < 5"
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
    })
}

//run
connection.connect(function(err) {
    if (err) {
        throw err
    }
    console.log("connected as id " + connection.threadId)
})

viewLow()
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

//view all product
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
        connection.end()
    })

}

//view low inventory
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
        connection.end() 
    })
}

//add to inventory
function addInventory () {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please Enter the Item ID number",
                name: "itemID"
            },
            {
                type: "input",
                message: "How many units would you like to add?",
                name: "unitsAdded"
            }
        ])
        .then(function(answer) {
            let query = "UPDATE products SET stock_quantity = stock_quantity +? WHERE item_id =?"
            connection.query(query, [answer.unitsAdded, answer.itemID], function(err, res) {
                if (err) {
                    throw err
                }
                console.log("Inventory Updated")
                connection.end()
            })
        })
}

//add new product
function addProduct() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter Product Name",
                name: "product"
            },
            {
                type: "input",
                message: "Enter Department Name",
                name: "department"
            },
            {
                type: "input",
                message: "Enter Price",
                name: "price"
            },
            {
                type: "input",
                message: "Enter Quantity",
                name: "quantity"
            }
        ])   
        .then(function(answer) {
            let query = "INSERT INTO products SET ?"
                connection.query(
                    query,
                    {
                    product_name: answer.product, 
                    department_name: answer.department, 
                    price: answer.price, 
                    stock_quantity: answer.quantity,
                    },
                    function(err, res) {
                    if (err) {
                        throw err
                    }    
                    console.log("Product Added")
                    connection.end()    
                })
        })
}

//manager menu
function managerOptions () {
    inquirer
        .prompt([
            {
                name: "task",
                type: "list",
                message: "How are You Managing?",
                choices:[
                    "View Products for Sale",
                    "View Low Inventory",
                    "Add to Inventory",
                    "Add New Product",
                    "Exit"
                ],
            }
        ])
        .then(function(answer) {
            switch (answer.task) {
                case "View Products for Sale":
                    viewProducts();
                    break;
                case "View Low Inventory":
                    viewLow();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addProduct();
                    break;
                case "Exit":
                    connection.end()
                    break;
            }
        })
}

//run
connection.connect(function(err) {
    if (err) {
        throw err
    }
    console.log("connected as id " + connection.threadId)
    managerOptions()
})
# bamazon

These apps use node and SQL to manipulate values in a database. Both require the node packages mysql and inquirer.

The first app, bamazonCustomer, connects and runs the displayAll function, which displays all values in the products table
before calling the makePurchase function,

The makePurchase function prompts the user to enter the item ID and quantity of the product they'd 
like to purchase, before calling the checkStock function, passing the itemID and unitsSold parameters.

The checkStock function checks the number of unitsSold against the stock_quantity column of the record corresponding with 
the userID. If the unitsSold exceeds the stock_quantity, "Insufficent Quantity!" is returned and the connection is ended.

![table display in console w/prompts, returning insufficient quantity](/images/out-of-stock.png)

If the unitsSold is less than or equal to stock_quantity, the reduceStock is called, passing the itemID, unitsSold, and 
res parameters. 

The reduceStock function reduces the stock_quantity column of the corresponding itemID by the unitsSold. The unitsSold
is multiplied by the individual unit price to return the total price of purchase before ending the connection.

![table display in console w/ prompts, returning total price](/images/total-price.png)

Restarting to view the table again reveals that the appropriate quantity, in this example 5 of ID# 2, have been removed
from stock

![table display with purchased quantity reduced from total](/images/sold.png)

The second app, bamazonManager, connects and runs the managerOptions function, prompting the user to choose from a list 
of managerial tasks, or to exit and end the connection.

![manager options menu](/images/manager-menu.png)

The first task 'View Products for Sale' runs the viewProducts function, which is identical to the displayAll function
above, but ends the connection instead of calling another function.

![view all products](/images/view-all.png)

The second task "View Low Inventory" runs the viewLow function, which returns all records for which the stock_quantity 
is less than 5, before ending the connection.

![view low inventory](/images/low-inventory.png)

The third task "Add to Inventory" runs the addInventory function which prompts the user to input the item id number and 
number of units they wish to replenish. The unit number is added to that item id's stock_quantity column, returning 
"Inventory Updated!" and ending the connection.

Performing the 'View Products for Sale' task again reveals that the appropriate quantity, in this example 10 of ID# 2, 
have been added to stock.

![product added to inventory](/images/add-to-stock.png)

The final task "Add New Product" runs the addProduct function whihc prompts the user to input the product name, department
name, price, and stock quantity of the new product. This information is inserted as a new record onto the properties table,
a new item_id number is generated with auto increment. "Product Added" is returned and the connection ends.

Performing the 'View Products for Sale" task again reveals that the new product has been added to stock.

![new record added to table](/images/new-product.png)
// **********************************************
// globals 
// **********************************************
var inquirer = require ("inquirer"); 
var mysql = require ("mysql"); 

var connection = mysql.createConnection({
   host: "localhost",
   port: 3306,
   user: "root",
   password: "Mysql000!",
   database: "employee_tracker_db"
});

connection.connect(function(err) {
   if (err) throw err;
   console.log("connected as id " + connection.threadId + "\n");

   // startFunction(); 

});

// **********************************************
// functions  
// **********************************************

// **********************************************
// listeners 
// **********************************************

// **********************************************
// init 
// **********************************************


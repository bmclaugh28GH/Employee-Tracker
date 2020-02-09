// **********************************************
// globals 
// **********************************************
var inquirer = require ("inquirer"); 
var mysql = require ("mysql"); 
const cTable = require('console.table');
var express = require("express");
var app = express();

var PORT = process.env.PORT || 8084;

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

   interact();

});

// **********************************************
// functions  
// **********************************************

function addRole(){

}; // addRole

function addDepartment(){
   console.log("addDepartment") 

   inquirer.
   prompt([
      {
         type:"input",
         message:"Enter a new department name",
         name:"newDeptName"
         }
   ])
   .then(function(response) {

      connection.query("select * from department where lower (name) = lower (?)", [response.newDeptName], function(err, result) {
      if (err) throw err;

      if (result.name == response.newDeptName){
         console.log ("This department already exists");
         return; 
      }

      connection.query("set @rc := addDepartment (?)", [response.newDeptName], function(err, result) {
      if (err) throw err; 
      console.log ("INSERT successful"); 
      });
      }); 
});


//      connection.query("select * from department order by name", function(err, result) {
//   if (err) throw err;

} // addDepartment

function addEmployee(){
   console.log("addEmployee"); 
} // addEmployee

function viewRoles(){
   console.log("viewRoles"); 
   connection.query("select * from role order by title", function(err, result) {
   if (err) throw err;
   console.log("\n"); 
   console.table(result);
   });
} // viewRoles

function viewDepartments(){
   console.log("viewDepartments"); 
   connection.query("select * from department order by name", function(err, result) {
   if (err) throw err;
   console.log("\n"); 
   console.table(result);
   });
} // viewDepartments 

function viewEmployees(){
   console.log("viewEmployees"); 
   connection.query("select * from employee order by last_name, first_name", function(err, result) {
   if (err) throw err;
   console.log("\n"); 
   console.table(result);
   });
} // viewEmployees 

function updateEmployeeRole(){
   console.log("updateEmployeeRole"); 
} // updateEmployeeRole 

function interact(){

   inquirer.
   prompt([
      {
         type:"list",
         message:"What do you want to do?",
         name:"action",
         choices:["Add role", "Add department", "Add employee","View roles", "View departments","View employees","Update employee role", "QUIT"]
         }
   ])
   .then(function(response) {

      console.log (response);

      switch (response.action){
      case "Add role":
         addRole();
         break; 
      case "Add department": 
         addDepartment();
         break; 
      case "Add employee":
         addEmployee();
         break; 
      case "View roles":
         viewRoles(); 
         break; 
      case "View departments":
         viewDepartments();
         break; 
      case "View employees":
         viewEmployees ();
         break; 
      case "Update employee role":
         updateEmployeeRole();
         break; 
      case "QUIT":
         console.log("shutting down...");
         connection.end();
         return; 
         break; 
      }

      //interact();

   })
/*      {
      type: "list",
      message: "'Upload' a profile image", 
      name: "profile_image", 
      choices: ['u.jpg', 'ew.jpg', 'q.jpg', 'h.jpg']
      },
      // 
      // ****************************************
      // manager-specific
      // ****************************************
      {
      type: "list",
      message: "What is the manager's specialty?", 
      name: "specialty", 
      choices: ['Team Manager', 'QA Manager', 'Development Manager'],
      when: function(answers) {
      return answers.role=='Manager'; 
      }
      }, 
*/

/*      {
         name: "choice",
         type: "rawlist",
         choices: function() {
         var choiceArray = [];
         for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].item_name);
         }
         return choiceArray;
         },
*/



} // interact 

// **********************************************
// listeners 
// **********************************************

// **********************************************
// init 
// **********************************************

//app.listen(PORT, function() {
//  console.log("Server listening on: http://localhost:" + PORT);
//});


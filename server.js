// **********************************************
// globals 
// **********************************************
var inquirer = require ("inquirer"); 
var mysql = require ("mysql"); 
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

function interact(){

   inquirer
   prompt([
      {
         type:"list",
         message:"What do you want to do?",
         name:"action",
         choices:["Add role", "Add department", "Add employee","View role", "View department","View employees","Update employee role"]
         }
   ])

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

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});


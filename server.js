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

// **********************************************
// functions  
// **********************************************

// **********************************************
// addRole 
// **********************************************

function addRole(){

   console.log("addRole"); 

   //connection.query("call getDepartments(0);", function(err, res) {
   connection.query("select * from department", function(err, res) {
      if (err) throw err; 

      //console.log (res); 
      //console.log (res[0]); 

      var choiceArray = [];
      for (var i = 0; i < res.length; i++) {
         //console.log ("in loop, " + res[i].name); 
         choiceArray.push(res[i].name);
      }
      //console.log (choiceArray);

      inquirer.
      prompt([
         {
            type:"input",
            message:"Enter a new role title",
            name:"newRoleTitle"
         }, 
         {
            type:"input",
            message:"What is the role's salary",
            name:"newRoleSalary"
         },
         {
            name: "newDeptChoice",
            message:"What department will the role be in?", 
            type: "rawlist",
            choices: function() {
               return choiceArray;
               }
         }
      ])
      .then(function(response) {

         //console.log ("here i am. " + response.newDeptChoice); 

         var newDeptID; 
         for (i = 0; i < res.length; i++) {
            if (res[i].name == response.newDeptChoice){
               newDeptId = res[i].id;
            }
         }

         connection.query("set @rc := addRole (?, ?, ?)",[response.newRoleTitle, response.newRoleSalary, newDeptId],function(err, result) {
            if (err) throw err; 
            console.log ("INSERT successful");
            interact(); 
         });
      })    
   })
} // addRole

// **********************************************
// addDepartment 
// **********************************************

function addDepartment(){
   console.log("addDepartment. starting") 

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
            interact(); 
         });
      }); 
   });

} // addDepartment

// **********************************************
// addEmployee 
// **********************************************

function addEmployee(){
   console.log("addEmployee"); 

   connection.query("select * from employee order by last_name, first_name", function(err, resE) {
      if (err) throw err; 

      connection.query("select * from role order by title", function(err, resR) {
         if (err) throw err; 

         var roleArray = [];
         for (var i = 0; i < resR.length; i++) {
            //console.log ("in loop, " + resR[i].title); 
            roleArray.push(resR[i].title);
         }

         var employeeArray = [];
         for (var i = 0; i < resE.length; i++) {
            //console.log ("in loop, " + resE[i].name); 
            employeeArray.push(resE[i].first_name); // + ' ' + resE[i].last_name);
         }

         inquirer.
         prompt([
            {
               type:"input",
               message:"First name",
               name:"newFName"
            }, 
            {
               type:"input",
               message:"Last name",
               name:"newLName"
            },
            {
               name: "newEmpRole",
               message:"What role will the employee perform?", 
               type: "rawlist",
               choices: function() {
                  return roleArray;
                  }
            },
            {
               name: "newEmpMgr",
               message:"Who will manage the employee?", 
               type: "rawlist",
               choices: function() {
                  return employeeArray;
                  }
            }
         ])
         .then(function(response) {

            //console.log ("here i am. " + response); 

            var newRoleID; 
            for (i = 0; i < resR.length; i++) {
               if (resR[i].title == response.newEmpRole){
                  newRoleID = resR[i].id;
               }
            }

            var newMgrID; 
            for (i = 0; i < resE.length; i++) {
               if (resE[i].first_name == response.newEmpMgr){
                  newMgrID = resE[i].id;
               }
            }

            connection.query("set @rc := addEmployee (?, ?, ?, ?)", 
               [response.newFName, response.newLName, newRoleID, newMgrID], 
               function(err, result) {

               if (err) throw err; 
               console.log ("INSERT successful"); 
               interact();

            });
         })
      })    
   })
} // addEmployee

// **********************************************
// **********************************************

function deleteDepartment(){
   console.log("deleteDepartment"); 

   connection.query("select * from department order by name", function(err, result) {
      if (err) throw err; 

      var deptList=[];
      var deptIdList=[];
      for (i=0;i<result.length;i++){
         deptList.push(result[i].title)
         deptIdList.push(result[i].id); 
      }

      inquirer.
      prompt([
         {
            name: "deleteDept",
            message:"Which department do you want to delete?", 
            type: "rawlist",
            choices: function() {
               return deptList;
               }
         }
      ])
      .then(function(response) {

         var deptId;
         for (i=0;i<deptList.length;i++){
            if (response.deleteDept == deptList[i]){
               deptId=deptIdList[i]; 
            }
         }
         //console.log (roleId); 
         var del = "delete from department where id = " + roleId; 
         connection.query(del, function(err, result) {
            if (err) throw err; 
            console.log ("DELETE successful"); 
            interact();

         });
      })
   })
} //deleteDepartment

// **********************************************
// **********************************************

function deleteRole(){
   console.log("deleteRole"); 

   connection.query("select * from role order by title", function(err, result) {
      if (err) throw err; 

      var roleList=[];
      var roleIdList=[];
      for (i=0;i<result.length;i++){
         roleList.push(result[i].title)
         roleIdList.push(result[i].id); 
      }

      inquirer.
      prompt([
         {
            name: "deleteRole",
            message:"Which role do you want to delete?", 
            type: "rawlist",
            choices: function() {
               return roleList;
               }
         }
      ])
      .then(function(response) {

         var roleId;
         for (i=0;i<roleList.length;i++){
            if (response.deleteRole == roleList[i]){
               roleId=roleIdList[i]; 
            }
         }
         //console.log (roleId); 
         var del = "delete from role where id = " + roleId; 
         connection.query(del, function(err, result) {
            if (err) throw err; 
            console.log ("DELETE successful"); 
            interact();

         });
      })
   })
} //deleteRole

// **********************************************
// **********************************************

function deleteEmployee(){
   console.log("deleteEmployee"); 

   connection.query("select * from employee order by last_name, first_name", function(err, result) {
      if (err) throw err; 

      var empList=[];
      var empIdList=[];
      for (i=0;i<result.length;i++){
         empList.push(result[i].first_name + ' ' + result[i].last_name)
         empIdList.push(result[i].id); 
      }

      inquirer.
      prompt([
         {
            name: "deleteEmp",
            message:"Who do you want to delete?", 
            type: "rawlist",
            choices: function() {
               return empList;
               }
         }
      ])
      .then(function(response) {

         var empId;
         for (i=0;i<empList.length;i++){
            if (response.deleteEmp == empList[i]){
               empId=empIdList[i]; 
            }
         }
         //console.log (empId); 
         var del = "delete from employee where id = " + empId; 
         connection.query(del, function(err, result) {
            if (err) throw err; 
            console.log ("DELETE successful"); 
            interact();

         });
      })
   })
} //deleteEmployee

// **********************************************
// **********************************************

function viewRoles(){
   console.log("viewRoles"); 
   connection.query("select * from role order by title", function(err, result) {
      if (err) throw err;
      console.log("\n"); 
      console.table(result);
      interact();
   });
} // viewRoles

// **********************************************
// **********************************************

function viewDepartments(){
   console.log("viewDepartments"); 
   connection.query("select * from department order by name", function(err, result) {
      if (err) throw err;
      console.log("\n"); 
      console.table(result);
      interact();
   });
} // viewDepartments 

// **********************************************
// **********************************************

function viewEmployees(){
   console.log("viewEmployees"); 
   connection.query("select * from employee order by last_name, first_name", function(err, result) {
      if (err) throw err;
      console.log("\n"); 
      console.table(result);
      interact();
   });
} // viewEmployees 

// **********************************************
// **********************************************

function viewEmployeesByMgr(){
   console.log("viewEmployeesByMgr");

   var mgrList = [];
   var mgrIDList = [];
   connection.query("select * from employee e where exists (select '*' from employee m where manager_id = e.id) order by e.last_name, e.first_name", 
   function(err, result) {
      if (err) throw err;
      for (i=0;i<result.length;i++){
         mgrIDList.push(result[i].id); 
         mgrList.push(result[i].first_name + ' ' + result[i].last_name);
      }
      console.log(mgrList);

      inquirer.
      prompt ([
         {
            name: "mgrName",
            message:"Whose employees do you want to view?", 
            type: "rawlist",
            choices: function() {
               return mgrList;
            }
         }
      ])
      .then(function(response) {

         // convert name to ID
         var mgrId;
         for (i=0;i<mgrList.length;i++){
            if (response.mgrName == mgrList[i]){
               mgrId = mgrIDList[i]; 
            }
         }

         connection.query("select * from employee where manager_id = ? order by last_name, first_name",[mgrId], 
         function(err, result) {
            if (err) throw err;

            console.log("\n"); 
            console.table(result);

            interact();
         })
      })
   });
} // viewEmployeesByMgr 

// **********************************************
// **********************************************

function viewDeptBudgetUsed(){
   console.log("viewEmployees"); 

   connection.query("select * from department order by name", function(err, result) {
      if (err) throw err; 

      var deptList=[];
      var deptIdList=[];
      for (i=0;i<result.length;i++){
         deptList.push(result[i].name)
         deptIdList.push(result[i].id); 
      }

      inquirer.
      prompt([
         {
            name: "viewDept",
            message:"Which department's budget utilized do you want to view?", 
            type: "rawlist",
            choices: function() {
               return deptList;
               }
         }
      ])
      .then(function(response) {

         var deptId;
         for (i=0;i<deptList.length;i++){
            if (response.viewDept == deptList[i]){
               deptId=deptIdList[i]; 
            }
         }

         var qry = '';
         qry += 'select d.name, sum(r.salary) as budget_used '; 
         qry += 'from department d, role r '; 
         qry += 'where r.department_id = d.id and d.id = ?';


console.log (deptId, + '\n' + qry); 

         connection.query(qry, [deptId], function(err, result) {
            if (err) throw err; 

            console.log("\n"); 
            console.table(result);
            interact();
         });
      })
   })
} // viewDeptBudgetUsed 

// **********************************************
// **********************************************

function updateEmployeeRole(){
   console.log("updateEmployeeRole"); 

   var empList = []; 
   var empIdList = []; 
   var empRoleList = []; 
   connection.query("select * from employee order by last_name, first_name", function(err, result) {
      if (err) throw err;
      //console.log(result);
      for (i=0;i<result.length;i++){

         //console.log(result[i].first_name); 
         empList.push(result[i].first_name + ' ' + result[i].last_name); 
         empIdList.push(result[i].id); 
         empRoleList.push(result[i].role_id); 
      }

      inquirer.
      prompt ([
         {
            name: "empToUpdate",
            message:"Whose role do you want to update?", 
            type: "rawlist",
            choices: function() {
               return empList;
            }
         }
      ])
      .then(function(response) {

         var empId; 
         var empRoleId; 
         for (i=0;i<empList.length;i++){
            if (empList[i]==response.empToUpdate){
               empId=empIdList[i];
               empRoleId = empRoleList[i];
            }
         }

         roleList=[];
         roleIdList=[];
         connection.query("select * from role where id <> ? order by title", 
         [empRoleId],
         function(err, result) {
            if (err) throw err;
            for (i=0;i<result.length;i++){
               roleList.push(result[i].title); 
               roleIdList.push(result[i].id); 
            }

            console.log(roleList); 

            inquirer.
            prompt ([
               {
                  name: "newRole",
                  message:"Pick a new role for the employee", 
                  type: "rawlist",
                  choices: function() {
                     return roleList;
                  }
               }
            ])
            .then(function(response) {

               var newRoleId; 
               for (i=0;i<roleList.length;i++){
                  if (roleList[i] == response.newRole){
                     newRoleId = roleIdList[i];
                  }
               }
               console.log(response.newRole); 

               connection.query("update employee set role_id = ? where id = ?", 
                  [newRoleId, empId], 
                  function(err, result) {

                  if (err) throw err; 
                  console.log ("UPDATE successful"); 
                  interact();

               })
            })
         })
      })
   })
} // updateEmployeeRole 

// **********************************************
// **********************************************

function interact(){

   inquirer.
   prompt([
      {
         type:"list",
         message:"What do you want to do?",
         name:"action",
         choices:
            ["Add role", 
            "Add department", 
            "Add employee",
            "Delete role", 
            "Delete department", 
            "Delete employee",
            "Update employee role", 
            "View roles", 
            "View departments",
            "View employees",
            "View employees by manager",
            "View budget allocated by department",
            "QUIT"]
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
      case "Delete role":
         deleteRole();
         break; 
      case "Delete department": 
         deleteDepartment();
         break; 
      case "Delete employee":
         deleteEmployee();
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
      case "View employees by manager":
         viewEmployeesByMgr ();
         break; 
      case "View budget allocated by department":
         viewDeptBudgetUsed();
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

   })
} // interact 

// **********************************************
// listeners 
// **********************************************

// **********************************************
// init 
// **********************************************

connection.connect(function(err) {
   if (err) throw err;
   console.log("connected as id " + connection.threadId + "\n");

/*
   connection.query("call getEmployees (0)", 
   function(err, result) {
       if (err) throw err;

      console.log (result); 
   })
*/

   interact();

});

//app.listen(PORT, function() {
//  console.log("Server listening on: http://localhost:" + PORT);
//});


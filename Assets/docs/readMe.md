* **EMPLOYEE TRACKER**

Employe tracker provides a CLI that lets a user update personnel data about an organization. 

Per the instructions, the app has a DB with 3 tables: department, role, and employee in employee_tracker_db.

* **FUNCTIONALITY**

Mandatory functionality is provided: 

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

I tackled several of the optional requirements: 

  * View employees by manager and 

  * View budget allocated by department 

* **COMMENTS**

I'm an oracle developer IRL, so I tried to do a few things that'd be more aligned with how I'd probably work. Namely, I tried using stored procedures instead of direct queries. It was fine for the ADDs, but I had problems with the VIEW procedures. They would return the data, I could see it on the console.log(). But I couldn't access the columns. The issue would immediately disappear when I used a SELECT statement. 

The reason for this is still a mystery.

In cases where I had a dropdown in inquirer, I create an extra array with IDs. That way I'd correlate, say, a name or title with the ID I'd need to use to SELECT or UPDATE data. The multiple array business seems a little cheesey. I'm figuring there's got to be a better way.  

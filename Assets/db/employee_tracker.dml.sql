insert into department (name) values ('Executive');
insert into role (title, salary, department_id) select 'CEO', 1000000, id from department where name = 'Executive'; 
insert into role (title, salary, department_id) select 'CFO', 800000, id from department where name = 'Executive'; 
insert into employee (first_name, last_name, role_id, manager_id) select 'Emily', 'R', r.id, null from role r where title = 'CEO';

insert into employee (first_name, last_name, role_id, manager_id) 
select 'Bill', 'P', r.id, e.id from role r, employee e 
where title = 'CFO';

insert into department (name) values ('Sales');
insert into role (title, salary, department_id) select 'Sales Manager', 100000, id from department where name = 'Sales'; 
insert into role (title, salary, department_id) select 'Salesperson', 80000, id from department where name = 'Sales';
-- insert into employee (first_name, last_name, role_id, manager_id) select 'Carol', 'A', r.id, null from role r where title = 'CFO';


insert into department (name) values ('Service');
insert into role (title, salary, department_id) select 'Service Manager', 100000, id from department where name = 'Service';
insert into role (title, salary, department_id) select 'Service Rep', 80000, id from department where name = 'Service';
insert into role (title, salary, department_id) select 'Mechanic', 60000, id from department where name = 'Service';




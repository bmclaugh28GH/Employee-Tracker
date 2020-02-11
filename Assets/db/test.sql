select * FROM department

select * from role where department_id = 3

select * from employee order by id

select * from department where lower (name) = lower (trim ('   sales ')); 

select d.name, sum(r.salary) as budget_used
from department d, role r 
where r.department_id = d.id and d.id = 1

   
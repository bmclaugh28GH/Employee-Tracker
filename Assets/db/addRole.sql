-- **********************************************
-- **********************************************
delimiter //
create function addRole 
   (iTitle varchar(100),
   iSalary integer,
   iDept_id integer)
returns integer 
deterministic 
begin 
   insert into role (title, salary, department_id) value (iTitle, iSalary, iDept_id);
   set @rc := last_insert_id();
   return @rc; 
end // 
delimiter ;

/*

set @myRc := addRole ('TEST', 1000000, 4);
select @myRc;  
select * from role; 

delete from role where upper (title) = 'role';
*/ 


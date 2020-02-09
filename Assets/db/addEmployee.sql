-- **********************************************
-- **********************************************
delimiter //
create function addEmployee 
   (iFName varchar(100),
   iLName varchar(100),
   iRole_id integer,
   iMgr_id integer)
returns integer 
deterministic 
begin 
   insert into employee (first_name, last_name, role_id, manager_id) value (iFName, iLName, iRole_id, iMgr_id);
   set @rc := last_insert_id();
   return @rc; 
end // 
delimiter ;

/*

set @myRc := addEmployee ('TEST', 'McTest', 1, 1);
select @myRc;  
select * from employee; 

delete from employee where upper (first_name) = 'TEST';
*/ 


-- **********************************************
-- **********************************************
delimiter //
create function addDepartment (dName varchar(100))
returns integer 
deterministic 
begin 
   insert into department (name) value (dName);
   set @rc := last_insert_id();
   return @rc; 
end // 
delimiter ;

/*

set @myRc := addDepartment ('TEST');
select @myRc;  
select * from department; 

delete from department where upper (name) = 'TEST';
*/ 


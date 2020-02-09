-- ***********************************************
-- getDepartments, pass desired ID for 1, 0 for all 
-- ***********************************************
delimiter // 
create procedure getDepartments (in d_id integer)
begin 
   select * from department where id = d_id or d_id = 0; 
end // 
delimiter ; 

/*

call getDepartments (0)

call getDepartments (1);

*/
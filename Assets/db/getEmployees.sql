-- ***********************************************
-- getEmployees, pass desired ID for 1, 0 for all 
-- ***********************************************
delimiter // 
create procedure getEmployees (in d_id integer)
begin 
   select * from employee where id = d_id or d_id = 0; 
end // 
delimiter ; 

/*

call getEmployees (0)

call getEmployees (1);

*/
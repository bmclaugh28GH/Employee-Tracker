-- ***********************************************
-- getRoles, pass desired ID for 1, 0 for all 
-- ***********************************************
delimiter // 
create procedure getRoles (in d_id integer)
begin 
   select * from role where id = d_id or d_id = 0; 
end // 
delimiter ; 

/*

call getRoles (0)

call getRoles (4);

*/
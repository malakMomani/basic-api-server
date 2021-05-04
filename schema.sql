DROP table IF EXISTS character;

create table character (
  id serial primary key not null, 
  name VARCHAR(200)
);
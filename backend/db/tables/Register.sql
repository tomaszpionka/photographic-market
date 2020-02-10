create table register (
  id serial,
  email varchar(128) unique not null,
  password varchar(16) not null
)
create table test (
  id serial,
  username varchar(32),
  email varchar(32) unique not null,
  password varchar(64) not null,
  primary key (ID)
  )
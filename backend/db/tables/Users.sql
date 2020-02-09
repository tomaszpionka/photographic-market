create table users (
  id serial,
  email varchar(128) unique not null,
  password_salt varchar(16) not null,
  password_hash varchar(128) not null,
  name varchar(32) not null,
  surname varchar(32) not null,
  gender varchar(16),
  country varchar(32) not null,
  city varchar(64) not null,
  region varchar(32),
  postal_code varchar(16) not null,
  street varchar(64) not null,
  street_number varchar(16) not null,
  local_number varchar(16),
  coordinates point not null,
  primary key (ID)
  )
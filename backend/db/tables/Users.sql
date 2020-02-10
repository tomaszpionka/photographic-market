create table users (
  id serial,
  email varchar(128) unique not null,
  password_salt varchar(16) not null,
  password_hash varchar(128) not null,
  name varchar(32) DEFAULT '_',
  surname varchar(32) DEFAULT '_',
  gender varchar(16) DEFAULT '_',
  country varchar(32) DEFAULT '_',
  city varchar(64) DEFAULT '_',
  region varchar(32) DEFAULT '_',
  postal_code varchar(16) DEFAULT '_',
  street varchar(64) DEFAULT '_',
  street_number varchar(16) DEFAULT '_',
  local_number varchar(16) DEFAULT '_',
  coordinates point not null,
  primary key (ID)
  )
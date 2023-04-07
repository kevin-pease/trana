create table if not exists users(
  id integer primary key autoincrement,
  name text,
  profile_pic_id text
);

insert or replace into users(id, name, profile_pic_id) values(
  1,
  'Bob',
  'profile1'
);
insert or replace into users(id, name, profile_pic_id) values(
  2,
  'Alice',
  'profile2'
);
insert or replace into users(id, name, profile_pic_id) values(
  3,
  'Julia',
  'profile3'
);
insert or replace into users(id, name, profile_pic_id) values(
  4,
  'Henk',
  'profile4'
);

create table if not exists exercises(
  id integer primary key autoincrement,
  userid integer,
  name text not null,
  date text not null
);

insert or replace into exercises(id,userid,name,date) values(
  1,
  4,
  'Hamburger contest',
  '2022-05-13'
);
insert or replace into exercises(id,userid,name,date) values(
  2,
  4,
  'Beer drink session',
  '2022-06-04'
);
insert or replace into exercises(id,userid,name,date) values(
  3,
  4,
  'A walk to the fridge',
  '2022-06-13'
);
insert or replace into exercises(id,userid,name,date) values(
  4,
  1,
  '5km run',
  '2022-12-25'
);
insert or replace into exercises(id,userid,name,date) values(
  5,
  4,
  'Smoke a pack of cigarettes',
  '2022-07-02'
);
insert or replace into exercises(id,userid,name,date) values(
  6,
  4,
  'Bitterball Marathon',
  '2022-06-13'
);
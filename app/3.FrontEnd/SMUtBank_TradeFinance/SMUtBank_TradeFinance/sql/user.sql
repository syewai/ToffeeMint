
drop schema if exists toffeemint;

create database if not exists toffeemint;
use toffeemint;

create table if not exists user(
Userid int(11) not null,
Username varchar(50),
Password varchar(50),
Usertype varchar(20),
constraint user_pk primary key(userid)
);

INSERT INTO user (Userid, Username, Password, Usertype)
VALUES  (1, 'toffeemint', 'toffeemint123', 'importer');
INSERT INTO user (Userid, Username, Password, Usertype)
VALUES  (2, 'importer123', '123456', 'importer');
INSERT INTO user (Userid, Username, Password, Usertype)
VALUES  (3, 'exporter123', '654321', 'exporter');
INSERT INTO user (Userid, Username, Password, Usertype)
VALUES  (4, 'exporter456', '123456', 'exporter');
INSERT INTO user (Userid, Username, Password, Usertype)
VALUES  (5, 'issuingBank123', '123456', 'issuingBank');
INSERT INTO user (Userid, Username, Password, Usertype)
VALUES  (6, 'advisingBank123', '654321', 'advisingBank');
INSERT INTO user (Userid, Username, Password, Usertype)
VALUES  (7, 'shipper123', '123456', 'shipper');

CREATE DATABASE VitoAPIDB;

CREATE TABLE Box(
    BoxID SERIAL PRIMARY KEY,
    MacAddress text,
    Name text,
    Comment text,
    Active Boolean
);

CREATE TABLE BoxUser(
    BoxUserID SERIAL PRIMARY KEY,
    BoxID INTEGER,
    UserID INTEGER,
    StartDate timestamp ,
    EndDate timestamp 
);

CREATE TABLE Location(
    LocationID SERIAL PRIMARY KEY,
    BoxUserID INTEGER,
    Latitude numeric,
    Longitude numeric, 
    StartDate timestamp,
    EndDate timestamp 
);

CREATE TABLE monitoring(
    monitoringid SERIAL PRIMARY KEY,
    boxid INTEGER,
    sdcapacity text,
    batterystatus Boolean, 
    batterypercentage numeric
);

CREATE TABLE "user"(
    userid SERIAL PRIMARY KEY,
    firstname text,
    lastname text,
    password text,
    email text,
    address text,
    postalcode text,
    city text,
    usertypeid INTEGER
);

CREATE TABLE usertype(
    usertypeid SERIAL PRIMARY KEY,
    usertypename text
);

CREATE TABLE sensorbox(
    boxid SERIAL PRIMARY KEY,
    sensorid INTEGER 
);

CREATE TABLE measurement(
    measurementid SERIAL PRIMARY KEY,
    boxid INTEGER,
    sensorid INTEGER,
    value text,
    timestamp timestamp
);

CREATE TABLE sensor(
    sensorid SERIAL PRIMARY KEY,
    name text,
    sensortypeid INTEGER 
);

CREATE TABLE sensortype(
    sensortypeid SERIAL PRIMARY KEY,
    name text,
    unit text 
);
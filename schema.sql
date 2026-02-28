CREATE DATABASE IF NOT EXISTS sgpa;
USE sgpa;

CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    usn VARCHAR(20) NOT NULL,
    dsdv INT,
    epc INT,
    na INT,
    coa INT,
    math INT,
    adsdl INT,
    lpl INT,
    scr INT,
    sgpa FLOAT
);
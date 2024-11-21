CREATE TABLE member
(
    id          VARCHAR(20) PRIMARY KEY,
    email       VARCHAR(30) UNIQUE,
    password    VARCHAR(30) NOT NULL,
    description VARCHAR(1000),
    inserted    DATETIME DEFAULT NOW()
);

INSERT INTO member
    (id, email, password, description)
    value ('admin', 'server', 'admin', 'server administrator');

SELECT *
FROM member;
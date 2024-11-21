CREATE TABLE board
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    title    VARCHAR(300)  NOT NULL,
    content  VARCHAR(5000) NOT NULL,
    writer   VARCHAR(20)   NOT NULL REFERENCES member (id),
    inserted DATETIME DEFAULT NOW()
);

select *
FROM board;

DROP TABLE board;
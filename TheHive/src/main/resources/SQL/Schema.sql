-- DROP SCHEMA TheHive;

CREATE SCHEMA TheHive;

USE TheHive;

CREATE TABLE Organization (
	organizationID BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (organizationID)
);

INSERT INTO Organization VALUES 
(1, 'Nestle');

CREATE TABLE space (
	spaceID BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    organizationID BIGINT NOT NULL,
    PRIMARY KEY (spaceID),
    FOREIGN KEY (organizationID) REFERENCES Organization(organizationID)
);

CREATE TABLE User (
	userID BIGINT NOT NULL AUTO_INCREMENT,
    email VARCHAR (255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255),
    organizationID BIGINT NOT NULL,
    PRIMARY KEY (userID),
    FOREIGN KEY (organizationID) REFERENCES Organization(organizationID)
);

CREATE TABLE AdminsInspace (
	userID BIGINT NOT NULL,
	spaceID BIGINT NOT NULL,
	FOREIGN KEY (spaceID) REFERENCES space(spaceID),
    FOREIGN KEY (userID) REFERENCES User(userID)
);

CREATE TABLE UsersInspace (
	userID BIGINT NOT NULL,
	spaceID BIGINT NOT NULL,
	FOREIGN KEY (spaceID) REFERENCES space(spaceID),
    FOREIGN KEY (userID) REFERENCES User(userID)
);

-- Every space must have a main page for blog posts
CREATE TABLE Page (
	pageID BIGINT NOT NULL AUTO_INCREMENT,
    spaceID BIGINT NOT NULL,
    userID BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    CHECK (type IN ('main', 'doc', 'team', 'project')),
    PRIMARY KEY (pageID),
    FOREIGN KEY (spaceID) REFERENCES space(spaceID),
    FOREIGN KEY (userID) REFERENCES User(userID)
);

CREATE TABLE Post (
	postID BIGINT NOT NULL AUTO_INCREMENT,
    spaceID BIGINT NOT NULL,
    pageID BIGINT NOT NULL,
    userID BIGINT NOT NULL,
    title VARCHAR(255),
    content VARCHAR(1250) NOT NULL,
    datePosted DATETIME,
    replyTo BIGINT DEFAULT -1,
    tags VARCHAR(255),
    PRIMARY KEY (postID),
    FOREIGN KEY (spaceID) REFERENCES space(spaceID),
    FOREIGN KEY (pageID) REFERENCES Page(pageID),
    FOREIGN KEY (userID) REFERENCES User(userID)
);

CREATE TABLE Permissions (
	userID BIGINT NOT NULL,
    spaceID BIGINT NOT NULL,
    pageID BIGINT NOT NULL,
    create_ TINYINT DEFAULT 0,
    read_ TINYINT DEFAULT 0,
    update_ TINYINT DEFAULT 0,
    delete_ TINYINT DEFAULT 0,
    FOREIGN KEY (spaceID) REFERENCES space(spaceID),
    FOREIGN KEY (pageID) REFERENCES Page(pageID),
    FOREIGN KEY (userID) REFERENCES User(userID)
);
CREATE SCHEMA IF NOT EXISTS TheHive;

USE TheHive;

CREATE TABLE IF NOT EXISTS TheHive.Organization (
	organizationID BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (organizationID)
);

-- xxx (3 random digits for org) yyyyyyyyy(9 random digits for user)
INSERT INTO Organization VALUES 
(100, 'Nestle');

CREATE TABLE IF NOT EXISTS TheHive.Space (
	spaceID BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    organizationID BIGINT NOT NULL,
    PRIMARY KEY (spaceID),
    FOREIGN KEY (organizationID) REFERENCES Organization(organizationID)
);

CREATE TABLE IF NOT EXISTS TheHive.Team (
	teamID BIGINT NOT NULL,
    managerID BIGINT NOT NULL,
    organizationID BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    location VARCHAR(255) NOT NULL,
    PRIMARY KEY (teamID),
	FOREIGN KEY (organizationID) REFERENCES Organization(organizationID)
);

CREATE TABLE IF NOT EXISTS TheHive.User (
	userID BIGINT NOT NULL AUTO_INCREMENT,
    email VARCHAR (255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255),
    organizationID BIGINT NOT NULL,
    teamID BIGINT DEFAULT -1,
    role VARCHAR(255),
    description VARCHAR(255),
    CanCreate TINYINT DEFAULT 0,
    CanUpdate TINYINT DEFAULT 0,
    CanRead TINYINT DEFAULT 1,
    CanDelete TINYINT DEFAULT 0,
    PRIMARY KEY (userID),
    FOREIGN KEY (organizationID) REFERENCES Organization(organizationID),
	FOREIGN KEY (teamID) REFERENCES Team(teamID)
);

CREATE TABLE IF NOT EXISTS TheHive.AdminsInspace (
	userID BIGINT NOT NULL,
	spaceID BIGINT NOT NULL,
	FOREIGN KEY (spaceID) REFERENCES space(spaceID),
    FOREIGN KEY (userID) REFERENCES User(userID)
);

CREATE TABLE IF NOT EXISTS TheHive.UsersInspace (
	userID BIGINT NOT NULL,
	spaceID BIGINT NOT NULL,
	FOREIGN KEY (spaceID) REFERENCES space(spaceID),
    FOREIGN KEY (userID) REFERENCES User(userID)
);

-- Every space must have a main page for blog posts
CREATE TABLE IF NOT EXISTS TheHive.Page (
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

CREATE TABLE IF NOT EXISTS TheHive.Post (
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

CREATE TABLE IF NOT EXISTS TheHive.Permissions (
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


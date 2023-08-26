CREATE SCHEMA TheHive;

USE TheHive;

CREATE TABLE Organization (
	organizationID BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (organizationID)
);

CREATE TABLE Community (
	communityID BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    organizationID BIGINT NOT NULL,
    PRIMARY KEY (communityID),
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

CREATE TABLE AdminsInCommunity (
	userID BIGINT NOT NULL,
	communityID BIGINT NOT NULL,
	FOREIGN KEY (communityID) REFERENCES Community(communityID),
    FOREIGN KEY (userID) REFERENCES User(userID)
);

CREATE TABLE UsersInCommunity (
	userID BIGINT NOT NULL,
	communityID BIGINT NOT NULL,
	FOREIGN KEY (communityID) REFERENCES Community(communityID),
    FOREIGN KEY (userID) REFERENCES User(userID)
);

-- Every community must have a main page for blog posts
CREATE TABLE Page (
	pageID BIGINT NOT NULL AUTO_INCREMENT,
    communityID BIGINT NOT NULL,
    userID BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    CHECK (type IN ('main', 'doc', 'team', 'project')),
    PRIMARY KEY (pageID),
    FOREIGN KEY (communityID) REFERENCES Community(communityID),
    FOREIGN KEY (userID) REFERENCES User(userID)
);

CREATE TABLE Post (
	postID BIGINT NOT NULL AUTO_INCREMENT,
    communityID BIGINT NOT NULL,
    pageID BIGINT NOT NULL,
    userID BIGINT NOT NULL,
    title VARCHAR(255),
    content VARCHAR(1250) NOT NULL,
    datePosted DATETIME,
    replyTo BIGINT DEFAULT -1,
    tags VARCHAR(255),
    PRIMARY KEY (postID),
    FOREIGN KEY (communityID) REFERENCES Community(communityID),
    FOREIGN KEY (pageID) REFERENCES Page(pageID),
    FOREIGN KEY (userID) REFERENCES User(userID)
);

CREATE TABLE Permissions (
	userID BIGINT NOT NULL,
    communityID BIGINT NOT NULL,
    pageID BIGINT NOT NULL,
    create_ TINYINT DEFAULT 0,
    read_ TINYINT DEFAULT 0,
    update_ TINYINT DEFAULT 0,
    delete_ TINYINT DEFAULT 0,
    FOREIGN KEY (communityID) REFERENCES Community(communityID),
    FOREIGN KEY (pageID) REFERENCES Page(pageID),
    FOREIGN KEY (userID) REFERENCES User(userID)
);
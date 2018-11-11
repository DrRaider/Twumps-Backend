/* ALTER TABLE tweets RENAME TO TempOldTable;
CREATE TABLE  IF NOT EXISTS tweets (
 id INTEGER NOT NULL PRIMARY KEY,
 uploaded INTEGER NOT NULL,
 created TEXT NOT NULL,
 content TEXT NOT NULL,
 author TEXT NOT NULL,
 proba  TEXT NOT NULL,
 source  TEXT NOT NULL,
 user TEXT NOT NULL,
 id_str TEXT NOT NULL,
 retweet_count TEXT,
 favorite_count TEXT,
 hashtags TEXT,
 user_mentions TEXT
);

INSERT INTO tweets (uploaded, created, content, author, proba, source, user, id_str) SELECT uploaded, created, text, author, proba, source, user, id_str FROM TempOldTable;
DROP TABLE IF EXISTS TempOldTable;
*/

CREATE TABLE IF NOT EXISTS tagcloud (
 id INTEGER PRIMARY KEY,
 word TEXT NOT NULL,
 count INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS emotion (
 id INTEGER PRIMARY KEY,
 year TEXT NOT NULL,
 pos INTEGER NOT NULL,
 neutral INTEGER NOT NULL,
 neg INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS cities (
 id INTEGER PRIMARY KEY,
 city TEXT NOT NULL,
 lat TEXT NOT NULL,
 lon TEXT NOT NULL,
 tweetId INTEGER NOT NULL,
 retweet_count TEXT NOT NULL
);

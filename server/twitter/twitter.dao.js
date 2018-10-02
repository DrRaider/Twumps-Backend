const sqlite = require("../sqlite");

let get_tweets = async () => {
    return await sqlite.all("SELECT CONTENT, DATED, USER, NAME FROM TWEETS");
};

let update_tweet = async (id, tweet) => {
    let q1 = `INSERT OR IGNORE INTO TWEETS (ID, CONTENT, DATED, USER, NAME) VALUES (` + id +`, "` + tweet.text + `", "` + tweet.date + `", "` + tweet.user + `", "` + tweet.name + `")`;
    let q2 = `UPDATE TWEETS SET CONTENT= "` + tweet.text + `", DATED= "` + tweet.date + `", USER= "` + tweet.user + `", NAME= "` + tweet.name + `" WHERE id=`+ id;
    await sqlite.run(q1).catch((err) => {
        throw err;
    });
    return await sqlite.run(q2);
};

let delete_tweets = async () => {
    return await sqlite.run(`DELETE FROM TWEETS`);
};

// Config Table
let get_config = async () => {
    return await sqlite.get("SELECT * FROM TWEETS_CONFIG WHERE ID=1");
};

let get_inAds = async () => {
    return await sqlite.get("SELECT ADS FROM TWEETS_CONFIG WHERE ID=1");
};

let edit_config = async (account, hashtag, used, ads) => {
    return await sqlite.run(`UPDATE TWEETS_CONFIG SET ACCOUNT= "`+ account + `", HASHTAG="`+ hashtag +`", USED=`+ used +`, ADS=`+ ads +` WHERE ID=1`);
};

let get_used = async () => {
    return await sqlite.get("SELECT USED FROM TWEETS_CONFIG WHERE ID=1");
};

module.exports = {
    get_tweets, update_tweet, get_config, edit_config, get_used, get_inAds, delete_tweets
};
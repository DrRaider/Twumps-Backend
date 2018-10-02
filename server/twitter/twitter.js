let twitter_dao = require("./twitter.dao");
let Twitter = require('twitter');
const ApiError = require('../utils/ApiError').ApiError;
const conf = {
    consumer_key : process.env.TWITTER_CONSUMER_KEY,
    consumer_secret : process.env.TWITTER_CONSUMER_SECRET,
    access_token_key : process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret : process.env.TWITTER_ACCESS_TOKEN_SECRET,
    request_options : {
        proxy: process.env.TWITTER_REQUEST_OPTIONS_PROXY
    }
};

// Parameters
let command     = 'statuses/user_timeline'; //Twitter API command see https://goo.gl/oCHxuW
let twitterApi = new Twitter(conf);
let param       = {
    screen_name : "creditagricole",         //Selecting the User
    count       : 50,                       //Number of tweets
    tweet_mode  : "extended"                //Tweets that contain more than 140 characters
};
let commandHash = 'search/tweets';
let paramHash   = {
    q           : "#CreditAgricole",        //Hashtag to be searched
    tweet_mode  : "extended",               //Tweets that contain more than 140 characters
    result_type : "mixed",                  //Returns popular qnd recent results
    count       : 100
};
let months = {
    "Jan" : "Janvier",
    "Feb" : "Février",
    "Mar" : "Mars",
    "Apr" : "Avril",
    "May" : "Mai",
    "Jun" : "Juin",
    "Jul" : "Juillet",
    "Aug" : "Août",
    "Sep" : "Septembre",
    "Oct" : "Octobre",
    "Nov" : "Novembre",
    "Dec" : "Décembre"
};

const get_tweets = async () => {
    return await twitter_dao.get_tweets();
};

// Refresh the tweets
const update_tweets = async () => {
    let result = await twitter_dao.get_config().catch((err) => {
        throw err;
    });
    param.screen_name = result.ACCOUNT;
    return await twitterApi.get(command , param)
        .then(async(data) => {
            let tweets = {
                t: []
            };
            for(let i in data) {
                // noinspection JSUnfilteredForInLoop
                let newTweet = data[i];
                if (newTweet.retweeted_status === undefined) {
                    let str = newTweet.created_at.split(" ");
                    let hour = str[3].split(":");
                    let date = months[str[1]] + " " + str[2] + ", " + str[5] + " - " + hour[0] + ":" + hour[1];
                    tweets.t.push({
                        "likes": newTweet.favorite_count,
                        "text": newTweet.full_text,
                        "date": date,
                        "name": newTweet.user.name,
                        "user": newTweet.user.screen_name
                    });
                }
            }
            tweets.t.sort(function(a, b){
                return b.likes - a.likes;
            });

            await twitter_dao.delete_tweets().catch((err) => {
                throw err;
            });

            for (const [index, item] of tweets.t.entries()) {
                if (index < 10)
                    await twitter_dao.update_tweet(index + 1, item).catch((err) => {
                        throw err;
                    });
                else
                    break;
            }
            return await twitter_dao.get_tweets();
        })
        .catch((err) => {
            console.log(err);
            throw  new ApiError('Twitter/get_tweets', err.message);
        });
};

// Same as update_tweets but it also uses the hashtag
const update_tweets_hashtag = async () => {
    let result = await twitter_dao.get_config().catch((err) => {
        throw err;
    });
    paramHash.q = "from:" + result.ACCOUNT + " AND " + result.HASHTAG;
    return await twitterApi.get(commandHash , paramHash)
        .then(async(data) => {
            let tweets = {
                t: []
            };

            let result = data.statuses;
            for(let i in result){
                // noinspection JSUnfilteredForInLoop
                let newTweet = result[i];
                if(newTweet.retweeted_status === undefined) {
                    let str = newTweet.created_at.split(" ");
                    let hour = str[3].split(":");
                    let date = months[str[1]] + " " + str[2] + ", " + str[5] + " - " + hour[0] + ":" + hour[1];
                    tweets.t.push({
                        "likes": newTweet.favorite_count,
                        "text": newTweet.full_text,
                        "date": date,
                        "name": newTweet.user.name,
                        "user": newTweet.user.screen_name
                    });
                }
            }

            tweets.t.sort(function(a, b){
                return b.likes - a.likes;
            });

            await twitter_dao.delete_tweets().catch((err) => {
                throw err;
            });

            for(const [index, item] of tweets.t.entries()) {
                if (index < 10)
                    await twitter_dao.update_tweet(index, item).catch((err) => {
                        throw err;
                    });
                else
                    break;
            }

            return await twitter_dao.get_tweets();
        })
        .catch((err) => {
            throw new ApiError('Twitter/get_tweets_hashtag', err.message);
        });

};

const edit_config = async (account, hashtag, used, ads) => {
    return await twitter_dao.edit_config(account, hashtag, used, ads);
};

const get_inAds = async() => {
    return await twitter_dao.get_inAds();
};

const get_config = async() => {
    return await twitter_dao.get_config();
};

const get_used = async () => {
    return await twitter_dao.get_used().USED;
};

module.exports = {
    get_tweets, update_tweets, update_tweets_hashtag, edit_config, get_used, get_config, get_inAds
};
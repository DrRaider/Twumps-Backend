const express = require("express");
const router = express.Router();
const twitter = require("./twitter");

// Return the last tweets
router.get("/", async (req, res, next) => {
    let used = await twitter.get_used();
    if (!used) {
        try {
            res.send(await twitter.update_tweets());
        } catch (err) {
            return next(err);
        }
    } else {
        try {
            res.send(await twitter.update_tweets_hashtag());
        } catch(err) {
            return next(err);
        }
    }
});

// Return if twitter must be displayed in the ads panel or not
router.get("/ads", async (req, res, next) => {
    try {
        res.send(await twitter.get_inAds());
    } catch(err) {
        return next(err);
    }
});

// Return twitter configuration
router.get("/config", async (req, res, next) => {
    try {
        res.send(await twitter.get_config());
    } catch(err) {
        return next(err);
    }
});

router.post("/", async (req, res, next) => {
    let account = req.body.account,
        hashtag = req.body.hashtag,
        used = req.body.used,
        ads = req.body.ads;
    try {
        let result = await twitter.edit_config(account, hashtag, used, ads).catch((err) => {
            throw err;
        });
        if (!used)
            await twitter.update_tweets().catch((err) => {
                throw err;
            });

        else
            await twitter.update_tweets_hashtag().catch((err) => {
                throw err;
            });

        res.send(result);
    } catch(err) {
        return next(err);
    }
});

module.exports = router;
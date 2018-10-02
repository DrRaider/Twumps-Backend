let twitter_router = require("./twitter");

// services call
let create_app = (server) => {
    server.use("/twitter", twitter_router);
};

module.exports = create_app;
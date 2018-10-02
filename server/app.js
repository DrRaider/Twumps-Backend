let jokes_router = require("./jokes");

// services call
let create_app = (server) => {
    server.use("/jokes", jokes_router);
};

module.exports = create_app;
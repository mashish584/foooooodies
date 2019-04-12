const next = require("next");
const routes = require("./routes");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app);

const { createServer } = require("http");
// set port
const port = process.env.PORT || 8080;
// process app
app.prepare().then(() => createServer(handler).listen(port));

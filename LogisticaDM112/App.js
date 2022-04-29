const express = require("express");
const routes = require("./routes");

module.exports = class App {
    constructor(port) {

        const app = express();

        app.use(express.json());
        app.use(routes);

        app.get("/", (req, res) => res.send("Ok"))

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}/`)
        })
    }
}

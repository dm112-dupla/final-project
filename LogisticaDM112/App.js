const express = require("express");
const routes = require("./routes");

module.exports = class App {
    constructor(port) {

        const app = express();

        app.use(express.json());
        app.use(routes);

        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}/`)
        })
    }
}

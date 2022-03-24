const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    return res.status(200).send("<h1>Hello World!</h1>");
});

app.listen(port, () => {
    console.log("SERVER IS LISTENNING IN PORT " + port);
});

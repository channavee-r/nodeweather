const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { query } = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
//define path
const viewsPath = path.join(__dirname, "../templete/views");
const partialPath = path.join(__dirname, "../templete/partials");

//Setup handlerbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//Setup static app location
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "channaveer",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        name: "channaveer",
        title: "About",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        name: "channaveer",
        contact: "8888888888",
        title: "Help",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "please set the address query",
        });
    } else {
        geocode(req.query.address, (error, data) => {
            if (error) {
                res.send({ error });
            }
            if (data) {
                const { lat, long, location } = data;
                forecast(lat, long, (error, forecastdata) => {
                    res.send({
                        forecast: forecastdata,
                        location: location,
                        address: req.query.address,
                    });
                });
            }
        });
    }
});

app.get("/help/*", (req, res) => {
    res.render("pageNotFound", {
        title: "404",
        errorMessage: "Help article not found",
        name: "channaveer",
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        });
    }
    console.log(req.query.serach);
    res.send({
        product: [],
    });
});

app.get("*", (req, res) => {
    res.render("pageNotFound", {
        title: "404",
        errorMessage: "Page not found",
        name: "channaveer",
    });
});

app.listen(port, () => {
    console.log("server is up and running" + port);
});

const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now} ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFileSync("server.log", log + "\n");
	next();
});

// app.use((req, res, next) => {
// 	res.render("maintainence.hbs");
// });

hbs.registerHelper("getCurrentYear", () => {
	return new Date().getFullYear();
});

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("screamIt", (text) => {
	return text.toUpperCase();
});

app.get("/", (req, res) => {
	res.render("home.hbs", {
		pageTitle: "Home Page",
		userName: "Ravi Ojha",
		welcomeMessage: "Home Page"
	});
});

app.get("/about", (req, res) => {
	res.render("about.hbs", {
		pageTitle: "About Page",
		welcomeMessage: "About Page"
	})
});

app.get("/bad", (req, res) => {
	res.send({
		name: "Bad Page",
		messgae: "This is bad route"
	});
});

app.listen(port, () => {
	console.log(`Sever is up @ ${port}`);
});

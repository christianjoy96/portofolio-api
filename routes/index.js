var express = require("express");
var router = express.Router();
var geoip = require("geoip-lite");

const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");

var db = new JsonDB(new Config("myDataBase", true, false, "/"));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/data", function (req, res, next) {
  const data = db.getData("myDataBase");
  res.status(200).send(data);
});

router.get("/test", function (req, res, next) {
  try {
    console.log("BEFORE PUSH", req.ip);
    var geo = geoip.lookup(req.ip);

    db.push("/data", geo);
    // const data = db.getData("myDataBase");
    res.status(200).send({ data: geo });
    console.log("AFTER PUSH");
  } catch (error) {
    console.log("ERROR", error);
    res.status(200).send(error);
  }
});

module.exports = router;

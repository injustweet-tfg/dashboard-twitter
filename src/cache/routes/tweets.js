const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// // This will help us connect to the database
const dbo = require("../db/conn");

// // This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// router.get("/", (req, res) => {
//     res.json({
//         status: "success",
//     });
// });

// List of tweets between two dates
router.route("/").get(function (req, res) {
    let db_connect = dbo.getDb("twitter");
    console.log(db_connect);
    // let user_name = req.query.user;
    let date_start = parseInt(req.query.dateStart);
    let date_end = parseInt(req.query.dateEnd);
    db_connect
        .collection("tweets_v1")
        // .find({ user: user_name })
        .find({ date: { $gt: date_start, $lt: date_end } })
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});


module.exports = router;
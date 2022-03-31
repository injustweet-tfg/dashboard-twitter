const { MongoClient, ServerApiVersion } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

var _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            // Verify we got a good "db" object
            if (db) {
                console.log(Db);
                _db = db.db("twitter");
                console.log("Successfully connected to MongoDB.");
            }
            else {
                console.log("Error connecting to MongoDB.");
                console.log(Db);
            }
            return callback(err);
        });
    },

    getDb: function () {
        return _db;
    },
};
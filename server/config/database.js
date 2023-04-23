const mongoose = require('mongoose');

mongoose.connect(`${process.env.DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME
}).then(() => {
    console.log("Connected to DB");
}).catch((error) => {
    console.log("Error while connecting to db ,", error);
})
import db from "./config/database.config";
import app from "./app";

db.sync().then(() => {
    console.log("connect to db");
}).catch(err => console.log(err.message));

const port = 3000;

app.listen(port, () => {
    console.log("server is running on port " + port);
});

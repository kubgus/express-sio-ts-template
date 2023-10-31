const express = require("express");
const { Server } = require("socket.io");
const path = require("path");

const port = process.env.PORT || 8080;

const app = express();
const exs = require("http").createServer(app).listen(port, () => {
    console.log(`🚀 Server started on port ${port}!`);
});
const sio = new Server(exs);

app.set("views", path.join(__dirname, "/client/views"));
app.use(express.static(__dirname + '/client/public'));

sio.on("connection", (io: any) => {
    console.log(`🤖 Session ${io.id} started!`);

    io.on("disconnect", () => {
        console.log(`❌ Session ${io.id} ended!`);
    });
});

app.get("/", (req: any, res: any) => { res.render("index.ejs") });
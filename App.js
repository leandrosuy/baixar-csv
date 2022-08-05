var express = require("express");
var app = express();
var http = require("http").createServer(app);
var fileSystem = require("fs");
var fastcsv = require("fast-csv");
var cors = require('cors');

app.use(cors());
app.use("/public", express.static(__dirname + "/public"));

const port = process.env.PORT || 3001;

http.listen(port, function () {
    console.log("Conectado!");

    app.get("/baixarcsv", function (request, result) {

        var data = [{
            "id": 1,
            "name": "Leandro",
            "age": 28
        }, {
            "id": 2,
            "name": "Eduardo",
            "age": 28
        }, {
            "id": 3,
            "name": "Kerleston",
            "age": 28
        },
        {
            "id": 4,
            "name": "Diego",
            "age": 28
        }
        ];

        var ws = fileSystem.createWriteStream("public/data.csv");
        fastcsv
            .write(data, { headers: true })
            .on("acabou!", function () {

                result.send("<a href='/public/data.csv' download='data.csv' id='download-link'></a><script>document.getElementById('download-link').click();</script>");
            })
            .pipe(ws);
    });
});
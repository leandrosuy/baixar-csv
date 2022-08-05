var express = require("express");
var app = express();
var http = require("http").createServer(app);
var fileSystem = require("fs");
var fastcsv = require("fast-csv");
var cors = require("cors");

app.use(cors());

app.use("/public", express.static(__dirname + "/public"));

const port = process.env.PORT || 3001

http.listen(port, function () {
    console.log("Connected");

    app.get("/baixarcsv", function (request, result) {

        var data = [{
            "id": 1,
            "name": "Leandro",
            "age": 29
        }, {
            "id": 2,
            "name": "Eduardo",
            "age": 31
        }, {
            "id": 3,
            "name": "Kerleston",
            "age": 33
        },
        {
            "id": 4,
            "name": "Diego",
            "age": 33
        }
        ];

        var ws = fileSystem.createWriteStream("public/data.csv");
        fastcsv
            .write(data, { headers: true })
            .on("finish", function () {

                result.send("<a href='/public/data.csv' download='data.csv' id='download-link'></a><script>document.getElementById('download-link').click();</script>");
            })
            .pipe(ws);
    });

    app.get("/baixartxt", function (request, result) {

        var data = [{
            "id": 1,
            "name": "Leandro",
            "age": 29
        }, {
            "id": 2,
            "name": "Eduardo",
            "age": 31
        }, {
            "id": 3,
            "name": "Kerleston",
            "age": 33
        },
        {
            "id": 4,
            "name": "Diego",
            "age": 33
        }
        ];

        var ws = fileSystem.createWriteStream("public/data.txt");
        fastcsv
            .write(data, { headers: true })
            .on("finish", function () {

                result.send("<a href='/public/data.txt' download='data.txt' id='download-link'></a><script>document.getElementById('download-link').click();</script>");
            })
            .pipe(ws);
    });

    app.get("/baixar", function (request, result) {

        var data = [{
            "id": 1,
            "name": "Leandro",
            "age": 29
        }, {
            "id": 2,
            "name": "Eduardo",
            "age": 31
        }, {
            "id": 3,
            "name": "Kerleston",
            "age": 33
        },
        {
            "id": 4,
            "name": "Diego",
            "age": 33
        }
        ];

        result.status(200).send(data);
    });
});
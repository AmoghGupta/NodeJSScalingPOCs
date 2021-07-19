"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//https://www.youtube.com/watch?v=1UcLoOD1lRM&ab_channel=BenAwad
var express_1 = __importDefault(require("express"));
var test_1 = __importDefault(require("./tsfiles/test"));
var app = express_1.default();
app.get('/', function (req, res, next) {
    var name = req.query.name;
    console.log(name);
    console.log(test_1.default.TEST);
    res.send({ "hello": name });
});
app.listen(3001, function () {
    console.log("started");
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const item_1 = require("./routes/item");
const PORT = 3000; //NETWORK PORT WHERE OUR SERVER LISTENS
const requestListener = (req, res) => {
    if (req.url?.startsWith("/products")) {
        (0, item_1.productsRoute)(req, res);
    }
    else {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Hello World" }));
    }
};
const server = http_1.default.createServer(requestListener);
server.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});

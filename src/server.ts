import http, {IncomingMessage, ServerResponse} from "http"
import { productsRoute } from "./routes/item";

const PORT =3000; //NETWORK PORT WHERE OUR SERVER LISTENS
const requestListener = (req:IncomingMessage, res:ServerResponse)=>{

    if(req.url?.startsWith("/products")){
        productsRoute(req,res)
    }
    else{
        res.writeHead(200, {"content-type":"application/json"});
        res.end(JSON.stringify({message: "Hello World"}));
    }
};

const server = http.createServer(requestListener)

server.listen(PORT, ()=>{
    console.log(`Running on http://localhost:${PORT}`);
    
})
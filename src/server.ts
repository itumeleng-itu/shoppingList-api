import http, {IncomingMessage, ServerResponse} from "http"

const PORT =3000; //NETWORK PORT WHERE OUR SERVER LISTENS
const requestListener = (req:IncomingMessage, res:ServerResponse)=>{
    res.writeHead(200, {"content-type":"application/json"});
    res.end(JSON.stringify({message: "Hello World"}));
};

const server = http.createServer(requestListener)

server.listen(PORT, ()=>{
    console.log(`Running on ${PORT}`);
    
})
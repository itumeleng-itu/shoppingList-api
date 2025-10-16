import { IncomingMessage, ServerResponse } from "http"; 
import { addProduct, getProducts, getProductById, deleteProduct, updateProduct } from "../controllers/item";

export const productsRoute = async (req: IncomingMessage, res: ServerResponse) => {
    if (req.url?.startsWith("/products")) {
        
        const parts = req.url.split("/");
        const id = parts[2] ? parseInt(parts[2]) : undefined;
        
        // GET all products
        if (req.method === "GET" && !id) {
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify(getProducts()));
            return;
        }
        
        // GET product by ID
        if (req.method === "GET" && id) {
            const product = getProductById(id);
            res.writeHead(product ? 200 : 404, { "content-type": "application/json" });
            res.end(JSON.stringify(product || { message: "not found" }));
            return;  
        }
        
        // POST new product
        if (req.method === "POST" && !id) {
            let body = "";
            
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            
            req.on('end', () => {
                try {
                    const { name, size } = JSON.parse(body);
                    
                    if (!name || size === undefined) {
                        res.writeHead(400, { "content-type": "application/json" });
                        res.end(JSON.stringify({ message: "name and size are required" }));
                        return;
                    }
                    
                    const newProduct = addProduct(name, size);
                    res.writeHead(201, { "content-type": "application/json" });
                    res.end(JSON.stringify(newProduct));
                } catch (error) {
                    res.writeHead(400, { "content-type": "application/json" });
                    res.end(JSON.stringify({ message: "invalid JSON" }));
                }
            });
            return;
        }
        
        // DELETE product
        if (req.method === "DELETE" && id) {
            const deleted = deleteProduct(id);
            
            if (deleted) {
                res.writeHead(200, { "content-type": "application/json" });
                res.end(JSON.stringify({ message: "product deleted" }));
            } else {
                res.writeHead(404, { "content-type": "application/json" });
                res.end(JSON.stringify({ message: "product not found" }));  
            }
            return;
        }
        
        // PATCH/UPDATE product
        if (req.method === "PATCH" && id) {
            let body = "";
            
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            
            req.on("end", () => {
                try {
                    const { size } = JSON.parse(body);
            
                    if (size === undefined || isNaN(size)) {
                        res.writeHead(400, { "content-type": "application/json" });
                        res.end(JSON.stringify({ message: "invalid size" }));
                        return;
                    }
            
                    const updated = updateProduct(id, size);
                    
                    if (updated) {
                        const product = getProductById(id); // Get updated product
                        res.writeHead(200, { "content-type": "application/json" });
                        res.end(JSON.stringify({ message: "product updated", product }));
                    } else {
                        res.writeHead(404, { "content-type": "application/json" });
                        res.end(JSON.stringify({ message: "product not found" }));
                    }
                } catch (error) {
                    res.writeHead(400, { "content-type": "application/json" });
                    res.end(JSON.stringify({ message: "invalid JSON" }));
                }
            });
            
            return;
        }
        
        // Route not found
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "route not found" }));
    }
}
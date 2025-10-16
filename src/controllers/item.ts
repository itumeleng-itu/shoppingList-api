import { Product } from "../models/item";

let products : Product[] =[];

let currentId = 1


//get
export const getProducts = (): Product[] =>{
    return products;
};

//get
export const getProductById = (id: number): Product | undefined => {
    const product = products.find((product) =>product.id === id)
    return product
}

//post
export const addProduct = (name:string, size:number ):Product =>{
    const newProduct:Product ={
        id:currentId++,
        name, 
        size
    }
    products.push(newProduct)
    return newProduct
}

//delete
export const deleteProduct = (id:number) =>{
    const index = products.findIndex(product=>product.id === id);

    if(index !==-1){
        products.splice(index,1);
        return true;
    }
    return false;
}

//patch
export const updateProduct = (id:number,size:number) =>{
    const index = products.findIndex(product=>product.id === id);
    if(index !==-1){
        products[index].size=size
        return true;
    }
    return false;
}
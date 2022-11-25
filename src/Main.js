import React from "react";
import { Routes, Route } from "react-router-dom";
import ItemDetailContainer from "./components/ItemDetailContainer";
import CategoryListContainer from "./components/CategoryListContainer"
import ItemListContainer from "./components/ItemListContainer";
import CategoryProducts from "./components/CategoryProducts";
import ProductListContainer from "./components/ProductListContainer";
import Cart from "./components/Cart";

const Main = () =>{
    return(  
        <main>
            <Routes>
                <Route path="/" exact element={<ItemListContainer/>}/> 
                <Route path="/categories" element={<CategoryListContainer/>}/>
                <Route path="/products" element={<ProductListContainer/>}/>
                <Route path="/product/:productid" element={<ItemDetailContainer/>}/>
                <Route path="/category/:id" element={<CategoryProducts/>}/>
                <Route path="/cart" element={<Cart/>}/>
            </Routes>  
        </main>
    )
}

export default Main
import ItemList from "./ItemList"
import Loader from "./Loader"
import { useEffect, useState } from "react"
import { DataContext } from "../App";
import { useContext } from 'react';

const ProductListContainer=()=>{
    const [products, setProducts] = useState([])

    const categories = useContext(DataContext);  
    useEffect(()=>{
        const prods = categories.map((cat)=>{
            return cat.products
        }).flat()
        setProducts(prods)
    },[])

    return <>
        {
            !products.length ? 
                <Loader/>
            :
               <div className="productlist">
                    <h5>TODOS LOS PRODUCTOS</h5>
                    {
                        products.map((prod)=>{
                            return <ItemList key={prod.id} product={prod} />
                        })
                    }
                </div>
        }
    </>
}

export default ProductListContainer
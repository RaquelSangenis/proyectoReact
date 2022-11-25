import { useParams } from "react-router"
import ItemDetail from "./ItemDetail"
import { DataContext } from "../App";
import { useContext, useEffect, useState } from 'react';

const ItemDetailContainer=()=>{
    const {productid} = useParams()
    const categories = useContext(DataContext);  
    const [product, setProduct] = useState(null)

    useEffect(()=>{
        if (!product || (product.id !== parseInt(productid))) {
            setProduct(categories.map((category)=>{
                return category.products
            }).flat().find((prod)=>parseInt(prod.id) === parseInt(productid)))
        }
        
    }, [categories,productid,product])

    
    return <div className="productDetailContainer">
            {
                product ? <ItemDetail info={product} /> : null
            }
                
            </div>
}

export default ItemDetailContainer
import { useParams } from "react-router"
import ItemDetail from "./ItemDetail"
import { DataContext } from "../App";
import { useContext } from 'react';

const ItemDetailContainer=()=>{
    const {productid} = useParams()
    const categories = useContext(DataContext);  

    const product = categories.map((category)=>{
        return category.products
    }).flat().find((prod)=>prod.id == parseInt(productid))
    
    return <div className="productDetailContainer">
                <ItemDetail info={product} />
            </div>
}

export default ItemDetailContainer
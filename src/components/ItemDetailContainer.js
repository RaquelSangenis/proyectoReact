import { useParams } from "react-router"
import  data from "../data/index.json"
import ItemDetail from "./ItemDetail"


const ItemDetailContainer=()=>{
    const {productid} = useParams()

    const product = data.map((category)=>{
        return category.products
    }).flat().find((prod)=>prod.id == parseInt(productid))
    
    return <div className="productDetailContainer">
                <ItemDetail info={product} />
            </div>
}

export default ItemDetailContainer
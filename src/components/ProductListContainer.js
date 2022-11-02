import  data from "../data/index.json"
import ItemList from "./ItemList"
import Loader from "./Loader"
import { useEffect, useState } from "react"


const ProductListContainer=()=>{
    const [products, setProducts] = useState([])

    useEffect(()=>{
        setTimeout(()=>{
            const mainPageProducts = data.map((category)=>{
                return category.products
            }).flat()

            setProducts(mainPageProducts)
        },1000)
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
                            return <ItemList product={prod} />
                        })
                    }
                </div>
        }
    </>
}

export default ProductListContainer
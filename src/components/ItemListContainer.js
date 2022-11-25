import ItemList from "./ItemList"
import Loader from "./Loader"
import { useEffect, useState } from "react"
import {db} from "./firebase"
import {collection, getDocs} from "firebase/firestore"

const ItemListContainer = () => {
    
    const [products, setProducts] = useState([])

    useEffect(()=>{
        async function getData(){
            const querySnapshot = await getDocs(collection(db, "categories"));
            let prods = []
            querySnapshot.forEach((cat) => {
                prods.push(cat.data().products)
            })
            prods = prods.flat()
            const destacados = prods.filter((prod)=> prod.mainPage == true)
            setProducts(destacados)
        }
       
        getData()
    },[])

    return <>
        {
            !products.length ? 
                <Loader/>
            :
               <div>
                    <h5>PRODUCTOS DESTACADOS</h5>
                    {
                        products.map((prod)=>{
                            return <ItemList key={prod.id} product={prod} />
                        })
                    }
                </div>
        }
    </>
}

export default ItemListContainer
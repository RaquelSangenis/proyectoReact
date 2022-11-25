import { collection, addDoc } from "firebase/firestore"; 
import { useState } from "react"
import { db } from "./firebase"
import ItemCount from "./ItemCount"
import Swal from 'sweetalert2'


const ItemDetail = ({info}) => {
    
    const [totalCount, setTotalCount] = useState(1)
    const [addingCart, setAddingCart] = useState(false)

    const handleCount = (count) => {
        setTotalCount(count)
    }

    const addToCart = () =>{
        setAddingCart(true)
        async function saveOnFirebase(){
            const result = await addDoc(collection(db, "cart"), {productID:info.id, name:info.name, price:info.price, quantity:totalCount});
            setAddingCart(false)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Producto agregado al carrito',
                showConfirmButton: false,
                timer: 1500
              })
        }
    
        saveOnFirebase()
    }
    

    return  <div className="card">
                <div className="col text-center">
                    <p>{info.name}</p>
                </div>
                    <img src={info.image} className="card-img-top" alt={info.description}/>
                <div className="card-body">
                    <p className="card-description">{info.description}</p>
                    <p className="card-price">Precio: ${info.price}</p>
                    <div className="col text-center addtocart">
                        <ItemCount num={totalCount} handleChange={handleCount} />
                        
                        {
                        addingCart ?
                            <button className="btn btn-dark btn-buy" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Agregando...
                            </button> 
                        :
                            <button className="btn btn-dark btn-buy" onClick={addToCart}>Agregar al carrito</button>
                        }
                        

                    </div>
                </div>
            </div>
}

export default ItemDetail
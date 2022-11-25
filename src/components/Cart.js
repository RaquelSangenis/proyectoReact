import { useState, useEffect } from "react"
import { db } from "./firebase"
import {addDoc, collection, deleteDoc,doc, getDocs } from "firebase/firestore"
import CartList from "./CartList";
import Swal from 'sweetalert2'

const Cart = () => {

    const [message, setMessage] = useState('')
    const [products, setProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [purchasing, setPurchasing] = useState(false)
    const [emptying, setEmptying] = useState(false)
    

    const getData = async () => {
        const cartItems = await getDocs(collection(db, "cart"));
        let prodsInCart = []
        cartItems.forEach((prod) => {
            let alreadyAdded = prodsInCart.find((item)=>item.productID == prod.data().productID)
            if (alreadyAdded !== undefined) {
                let index = prodsInCart.findIndex(elem => elem.productID == prod.data().productID)
                prodsInCart[index].quantity += prod.data().quantity
            }else {
                let data = prod.data()
                data['id']= prod.id
                prodsInCart.push(data)
            }
        })
        
        setProducts(prodsInCart)
    }

    useEffect(()=>{
        getData()
    },[])

    const emptyCart = async(showloader=null) => {
        if (showloader)
            setEmptying(true)

        const cartItems = await getDocs(collection(db, "cart"));

        cartItems.forEach((item) => {
            
            const docRef = doc(db, "cart", item.id);

            deleteDoc(docRef)
        });

        return true

    }

    useEffect(()=>{
        setTotalQuantity(products.reduce(((total,prod)=> (prod.quantity+total)), 0))
        setTotalPrice(products.reduce(((total,prod)=> ((prod.price*prod.quantity)+total)),0))
    },[products])

    const handleBuy = () =>{
        setPurchasing(true)
        async function saveOnFirebase(){
            const result = await addDoc(collection(db, "orders"), {products, totalPrice, created_at:new Date()});
            
            setPurchasing(false)

            if (result.id) {
                await emptyCart()
                
                setProducts([])
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Compra exitosa',
                    showConfirmButton: false,
                    timer: 2000
                  })
            }
        }
    
        saveOnFirebase()
    }

    const handleEmptyCart = async ()=>{
        await emptyCart(true)
        setEmptying(false)
        setProducts([])
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tu carrito ha sido vaciado',
            showConfirmButton: false,
            timer: 2000
          })
    }

    const handleRemoveProd = async (id) => {
        const cartItems = await getDocs(collection(db, "cart"));

        cartItems.forEach((item) => {
            if (item.id === id) {
                const docRef = doc(db, "cart", item.id);
                deleteDoc(docRef).then(()=>getData())
            }
        });

    }
    
    return (
        <div className="cartListContainer">
            {
                message !== '' ?
                    message :
                    <>
                        <CartList prods={products} quantity={totalQuantity} totalPrice={totalPrice} removeProduct={handleRemoveProd} />  
                        {
                            products.length ?
                            <div className="cart-btn-section">

                                {
                                    emptying ?
                                        <button className="btn btn-dark btn-empty" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Vaciando...
                                        </button>
                                    :
                                            <button className="btn btn-dark btn-empty" onClick={handleEmptyCart}>Vaciar carrito</button>
                                }
                                

                                {
                                    purchasing ?
                                        <button className="btn btn-dark btn-buy" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Comprando...
                                        </button>
                                    :
                                        <button className="btn btn-dark btn-cart" onClick={handleBuy}>Finalizar compra</button>
                                }                                                    
                                
                               
                            </div>
                                
                            : null
                        }
                        
                    </>
            }
        </div>
    )
}

export default Cart
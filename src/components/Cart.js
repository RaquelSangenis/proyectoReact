import { useState, useEffect } from "react"
import { db } from "./firebase"
import { collection, deleteDoc,doc, getDocs } from "firebase/firestore"
import CartList from "./CartList";
import Swal from 'sweetalert2'
import BuyForm from "./BuyForm";

const Cart = () => {
    const [result, setResult] = useState('')
    const [products, setProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)

    const getData = async () => {
        const cartItems = await getDocs(collection(db, "cart"));
        let prodsInCart = []
        cartItems.forEach((prod) => {
            let alreadyAdded = prodsInCart.find((item)=>item.productID === prod.data().productID)
            if (alreadyAdded !== undefined) {
                let index = prodsInCart.findIndex(elem => elem.productID === prod.data().productID)
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

    const emptyCart = async() => {

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

    

    const handleEmptyCart = async ()=>{
        await emptyCart(true)
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

    const handleFinishBuy = (val) => {
        setResult(val)
    }
    
    return (
        <div className="cartListContainer">
            {
                 products.length && result === '' ?
                    <>
                        <CartList prods={products} quantity={totalQuantity} totalPrice={totalPrice} removeProduct={handleRemoveProd} emptyCart={handleEmptyCart} /> 
                        
                        
                                <BuyForm products={products} totalPrice handleFinishBuy={handleFinishBuy} emptyCart={handleEmptyCart} />
                    </>
                    : (result !== '' ?
                            <div className="alert alert-success text-center successBuyMsg" role="alert">
                                        {result}
                            </div>
                        : 
                        <div className="alert alert-dark text-center noItemsCartMsg" role="alert">
                                        No hay productos en el cart
                            </div>
                            )    
            }
        </div>
    )
}

export default Cart
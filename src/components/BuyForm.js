import React, { useState } from 'react'
import { db } from "./firebase"
import {addDoc, collection } from "firebase/firestore"
import Swal from 'sweetalert2'

function BuyForm({products, totalPrice, emptyCart, handleFinishBuy }) {
    const [email,setEmail] = useState('')
    const [telefono,setTelefono] = useState('')
    const [purchasing, setPurchasing] = useState(false)
    const [warning, setWarning] = useState('')

    async function saveOnFirebase(){
        const result = await addDoc(collection(db, "orders"), {products, totalPrice, user:{email, telefono}, created_at:new Date()});
        
        setPurchasing(false)

        if (result.id) {
            handleFinishBuy(`Orden generada correctamente con ID: ${result.id}`)
            
            //llamo prop para resetear prods del cart
            await emptyCart()

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Compra exitosa',
                showConfirmButton: false,
                timer: 2000
              })
        }
    }

    const handleBuy = (e) =>{
        e.preventDefault()
        setWarning('')
        setPurchasing(true)
        if (email.trim() !== '' && telefono.trim() !== '') {
            setWarning('')
            saveOnFirebase()
        }else {
            setPurchasing(false)
            setWarning('Campos requeridos')
        }
    }

    return (
    <div className='row buyFormContainer'>
        <form className='buyForm'>
            <div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Telefono" onChange={(e)=>setTelefono(e.target.value)} />
                </div>
                {
                    warning !== "" ?
                    <div className="col">
                        <div className="alert alert-danger text-center" role="alert">
                            {warning}
                        </div>
                    </div>
                    : null
                }
                <div className='col buyButton'>
                    {
                        purchasing ?
                            <button className="btn btn-dark btn-cart" disabled >Comprando...</button>    
                        :
                        <button className="btn btn-dark btn-cart" onClick={handleBuy} >Finalizar compra</button>    
                    }
                
                </div>
            </div>
        </form>
    </div>
    )
}

export default BuyForm
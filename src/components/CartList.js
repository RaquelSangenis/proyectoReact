import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartListItem from './CartListItem'

export default function CartList({prods, quantity, totalPrice, removeProduct, emptyCart}) {

    return <table className="table container table-striped table-dark">
                <thead>
                    <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio unitario</th>
                    <th scope="col">Acciones</th>
                    {
                        prods.length ?
                            <th onClick={emptyCart} scope="col" className='emptyCartBtn'>
                                <FontAwesomeIcon className='icon trash-icon' icon={faTrash}/>
                                &nbsp;
                                Vaciar
                            </th>
                            : null
                    }
                    
                    </tr>
                </thead>
                <tbody>
                    {
                        prods.map((prod)=>{
                            return <CartListItem key={prod.productID} prod={prod} removeProd={()=>removeProduct(prod.id)} />
                        })
                    }
                    {
                         prods.length ?
                            <CartListItem prod={{isTotalRow:true, quantity:quantity, price:totalPrice}} /> 
                        : null
                    }
                    
                </tbody>
            </table>
}

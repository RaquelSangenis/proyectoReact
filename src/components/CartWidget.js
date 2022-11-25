import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { db } from "./firebase"
import { collection, getCountFromServer } from "firebase/firestore";
import { useEffect, useState } from 'react';

const CartWidget =() => {
    const [items, setItems] = useState(0)
    
    async function getItems() {
        const coll = collection(db, "cart");
        const snapshot = await getCountFromServer(coll);
        setItems(snapshot.data().count)
    }

    useEffect(()=>{
        getItems()
    })
        
    return <Link to='/cart'> 
            <FontAwesomeIcon className='icon' icon={faCartShopping}/>
            <span>
                {
                    items > 0 ? 
                        items 
                    : null
                }
            </span>
        </Link>
}

export default CartWidget 
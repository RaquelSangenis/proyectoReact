import { useState } from "react"
import ItemCount from "./ItemCount"

const ItemDetail = ({info}) => {
    const [totalCount, setTotalCount] = useState(1)

    const handleCount = (count) => {
        setTotalCount(count)
    }

    const handleBuy = () =>{
        alert(`Se compraron ${totalCount} productos, el costo total es $${totalCount*info.price}`)
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
                        <button className="btn btn-dark btn-buy" onClick={handleBuy}>Comprar</button>
                    </div>
                </div>
            </div>
}

export default ItemDetail
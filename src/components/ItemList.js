import {Link} from 'react-router-dom';

const ItemList = ({product}) => {
    return <Link to={`/product/${product.id}`}>
            <div className="card">
                <img src={product.image} className="card-img-top" alt={product.name}/>
                <div className="card-body">
                <p className="card-text">{product.name}</p>
                </div>
            </div>
        </Link>  
}

export default ItemList
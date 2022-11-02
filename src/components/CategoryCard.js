import {Link} from 'react-router-dom';

const CategoryCard=({category})=>{
    return <Link to={`/category/${category.id}`}>
                <div className="card">
                    <img src={category.image} className="card-img-top" alt={category.category}/>
                    <div className="card-body">
                        <h5 className="card-title">{category.category}</h5>
                    </div>
                </div>
            </Link>
}

export default CategoryCard
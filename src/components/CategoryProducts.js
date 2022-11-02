import React from 'react'
import { useParams } from 'react-router-dom';
import data from '../data/index.json'
import ItemList from './ItemList';


const CategoryProducts = () => {

    const {id} = useParams()
    const category = data.find((item)=>item.id == parseInt(id))
    
    return (
        <div>
            <h1>{category.category}</h1>
        {
            category.products.map((prod)=>{
                return <ItemList product={prod} />
            })
        }

        </div>
  )
}

export default CategoryProducts
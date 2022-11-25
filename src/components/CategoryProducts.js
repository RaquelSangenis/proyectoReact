import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import { DataContext } from '../App';
import Loader from './Loader';


const CategoryProducts = () => {

    const {id} = useParams()
    const info = useContext(DataContext)
    const [category, setCategory] = useState({})

    useEffect(()=>{
        if (info.length) {
            const cat = info.find((categ)=>categ.id === id);
            setCategory(cat)
        }
    }, [info, id])
    
    
    if (!category || !Object.keys(category).length)
        return <Loader />

    return <div>
                <h1>{category.category}</h1>
                {
                    category.products.map((prod)=>{
                        return <ItemList key={prod.id} product={prod} />
                    })
                }
            </div>
  
}

export default CategoryProducts
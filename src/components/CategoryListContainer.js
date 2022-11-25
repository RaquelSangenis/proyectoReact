import { useEffect, useState } from "react"
import CategoryCard from "./CategoryCard"
import { DataContext } from "../App";
import { useContext } from 'react';

const CategoryListContainer=()=>{
    const [info, setInfo] = useState([])
    const categories = useContext(DataContext);  
    useEffect(()=>{
        setInfo(categories)
    },[])

    return <>
    {
        info.map((category)=>{
            return <CategoryCard key={category.category} category={category}/>
        })
    }
    
    </>
}

export default CategoryListContainer
import { useEffect, useState } from "react"
import data from "../data/index.json"
import CategoryCard from "./CategoryCard"


const CategoryListContainer=()=>{
    const [info, setInfo] = useState([])
    
    useEffect(()=>{
        setInfo(data)
    },[])

    return <>
    {
        info.map((category)=>{
            return <CategoryCard key={category.id} category={category}/>
        })
    }
    
    </>
}

export default CategoryListContainer
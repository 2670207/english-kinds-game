import React, {useEffect , useState, MouseEvent} from 'react'
import {CategoryTypeInterface} from '../typing';
import { Link } from "react-router-dom";

export const Categories = () => {
    const [categories, setCategories] = useState([]);

    async function fetchWordsStatistics(){
        const response = await fetch(`/api/categories`);
        const data = await response.json();
        setCategories(data);   
    }
    useEffect( () => { fetchWordsStatistics() }, []);


    return (<div className="categories">
                <div className="categories__container">
                    {categories.map((category: CategoryTypeInterface) => {
                        return (
                            <Link to={`/category/words/${category._id}`} className="categories__item" >
                                <img src={category.image} className="categories__picture" alt={category.name}/>
                                <div className="categories__title">{category.name}</div>  
                            </Link> 
                        );
                    })}
                </div>
            </div>)
        
}
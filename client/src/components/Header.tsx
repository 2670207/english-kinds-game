import React, {useCallback, useContext, useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

type CatecoryTypeInterface = {
    _id: string,
    name: string
}
type StoreTypeInterface = {
    isModeGameTraining: boolean,
}
export const Header = () => {
    const isModeGameTraining = useSelector( (state: StoreTypeInterface) => state.isModeGameTraining);
    const dispatch = useDispatch();

    const [categories, setCategories] = useState([])
    const [toggleMenu, setToggleMenu] = useState(false);

    const toggleMenuHandler = useCallback(() => {
        setToggleMenu(() => !toggleMenu);
    }, [toggleMenu]);

    const changeModeGameHandler = useCallback(() => {
        console.log(isModeGameTraining);
        isModeGameTraining === true ?  dispatch({type: 'game.mode.play'}) : dispatch({type: 'game.mode.trainig'})
    }, [isModeGameTraining])

    async function fetchCategories (){
        const responce = await fetch("/api/categories/");
        const data = await responce.json();
        setCategories( () => data);
    }
 
    useEffect( () => {
        fetchCategories()
    }, []);

    
  return (
    <header className="header">
        <div className="header__navigation">
        <div className={ 'header__navigation-button-toggle ' +  (toggleMenu ? "active " : "") } onClick={toggleMenuHandler}></div> 

        <ul className={ 'header__menu ' +  (toggleMenu ? "active " : "") }> 
            {categories.map((category: CatecoryTypeInterface, index) => {
                    return (
                        <li className="header__menu-item" key={index}> 
                            <Link to={`/category/words/${category._id}`} className="header__menu-link" >{category.name}</Link>
                        </li>
                    )
                
            })}
        </ul>

           
        </div>
        <div className="header__switch">
        <div className="switcher">
            <input className="switcher__input" id="switcher" type="checkbox" name="switcher" />
            <label className="switcher__label" htmlFor="switcher" onClick={changeModeGameHandler} ></label>
        </div>
        </div>
    </header>
  )
}
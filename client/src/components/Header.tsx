import React, {useCallback, useContext, useEffect, useState} from 'react'
import { Link , RouteChildrenProps, useRouteMatch, useHistory, useParams} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CardTypeInterface } from '../typing';

type CategoryTypeInterface = {
    _id: string,
    name: string,
    active: string,
}
type StoreTypeInterface = {
    isModeGameTraining: boolean,
}

export const Header = (props: any) =>{
   
    
    const isModeGameTraining = useSelector( (state: StoreTypeInterface) => state.isModeGameTraining);
    const dispatch = useDispatch();

    const [categories, setCategories] = useState([])
    const [toggleMenu, setToggleMenu] = useState(false);
    const toggleMenuHandler = useCallback(() => { setToggleMenu(() => !toggleMenu)}, [toggleMenu]);
    
    const changeModeGameHandler = useCallback(() => {
        isModeGameTraining === true ?  dispatch({type: 'game.mode.play'}) : dispatch({type: 'game.mode.training'})
    }, [dispatch, isModeGameTraining])

    const onByClickMenuHandler = () => {
        categories.map((category: CategoryTypeInterface) => {
            category.active = ''
            if(window.location.pathname.includes(category._id)){
                category.active = 'active';
            }
            return category;
        });
        setToggleMenu(false);
        setCategories(categories);
    }

    async function fetchCategories (){
        const response = await fetch("/api/categories/");
        let data = await response.json();
        data = data.map((category: CategoryTypeInterface) => {
            category.active = ''
            if(window.location.pathname.includes(category._id)){
                category.active = 'active';
            }
            return category;
        })
        setCategories( () => data);
    }

    useEffect( () => {fetchCategories()}, []);
    
    
    
  return (
    <header className="header">
        <div className="header__navigation">
        <div className={ 'header__navigation-button-toggle ' +  (toggleMenu ? "active " : "") } onClick={toggleMenuHandler}></div> 
        <div className={ 'header__menu-wrapper ' +  (toggleMenu ? "active " : "") }  onClick={() => setToggleMenu(false)}></div>
            <ul className={ 'header__menu ' +  (toggleMenu ? "active " : "") }> 
                {categories.map((category: CategoryTypeInterface, index) => {
                    return (
                        <li className={`header__menu-item `}  key={index}> 
                            <Link to={`/category/words/${category._id}` }  onClick={onByClickMenuHandler}
                                className={'header__menu-link ' + category.active}>
                                    {category.name}
                                </Link>
                        </li>
                    )
                    
                })}
            </ul>
        
       

           
        </div>
        <div>
        <Link to={`/statistics/`} className={'header__button'}>Statistics</Link>
        </div>
        <div className="header__switch">
        <div className="switcher">
            <input className="switcher__input" id="switcher" type="checkbox" name="switcher" checked={isModeGameTraining ? true : false} />
            <label className="switcher__label" htmlFor="switcher" onClick={changeModeGameHandler} ></label>
        </div>
        </div>
    </header>
  )
}
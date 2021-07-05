import React, {useEffect , useState, MouseEvent} from 'react'
import {CardTypeInterface} from '../typing';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export const WordsStatistics = () => {
    const [statistics, setStatistics] = useState([]);
    const [sort, setSort] = useState({order: 'desc', field: 'perSent'});
    const dispatch = useDispatch();
    const history = useHistory();
 
    async function fetchWordsStatistics(){
        const response = await fetch(`/api/words/statistics?field=${sort.field}&order=${sort.order}`);
        const data = await response.json();
        setStatistics(data);   
    }
    useEffect( () => { fetchWordsStatistics() }, [sort]);

    const onClickByHeaderHandler = (event: MouseEvent) => {
        if(event.target instanceof HTMLElement){
            if(event.target.dataset.field){
                setSort({order: sort.order === 'desc' ? 'asc' : 'desc', field: event.target.dataset.field})
            }
        }
       
    }
    const onClickByButtonReset = async (event: MouseEvent) => {
       
        const response = await fetch(`/api/words/statistics/reset?field=${sort.field}&order=${sort.order}`);
        const data = await response.json();
        setStatistics(data);
    }
    const onClickByButtonRepeatDifficultWords = async (event: MouseEvent) => {
        dispatch({type: 'game.mode.play'});
        history.push('/statistics/difficult-words')
    }

    return (
        <div className="page">
            <div className="statistic">
                <div className="statistic__controls">
                    <button className="statistic__button" onClick={onClickByButtonRepeatDifficultWords}>Repeat difficult words</button>
                    <button className="statistic__button" onClick={onClickByButtonReset}>Reset</button>

                </div>
                <div className="statistic__table-container">
                    <table className="table">
                        <tr className="table__row">
                            <td className="table__header table__td table__td--header" data-field="word" onClick={onClickByHeaderHandler}>Word</td>
                            <td className="table__header table__td table__td--header" data-field="translation" onClick={onClickByHeaderHandler}>Translation</td>
                            <td className="table__header table__td table__td--header" data-field="category" onClick={onClickByHeaderHandler}>Category</td>
                            <td className="table__header table__td table__td--header" data-field="clicks" onClick={onClickByHeaderHandler}>Clicks</td>
                            <td className="table__header table__td table__td--header" data-field="correct" onClick={onClickByHeaderHandler}>Correct</td>
                            <td className="table__header table__td table__td--header" data-field="wrong" onClick={onClickByHeaderHandler}>Wrong</td>
                            <td className="table__header table__td table__td--header" data-field="perSent" onClick={onClickByHeaderHandler}>Errors</td>
                        </tr>
                        {statistics.map( (card: CardTypeInterface, index) => {
                             
                            return (
                                <tr className="table__row" key={index}>
                                    <td className="table__td">{card.word}</td>
                                    <td className="table__td">{card.translation}</td>
                                    <td className="table__td">{card.category}</td>
                                    <td className="table__td">{card.clicks}</td>
                                    <td className="table__td">{card.correct}</td>
                                    <td className="table__td">{card.wrong}</td>
                                    <td className="table__td">{card.perSent}%</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </div>
        </div>
    )
};
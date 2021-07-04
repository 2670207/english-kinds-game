
import React, {useCallback, useContext, useEffect, useState, MouseEvent} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"

export const GameFinishPageErrors = (props: any) => {
    const dispatch = useDispatch();
    const history = useHistory()

    useEffect( () => {
        const audio = new Audio('/audio/failure.mp3');
        audio.play();
        setTimeout(() => { history.push('/')}, 2000);
    }); 

    return (
        <div className="page">
            <div className="final">
                <div className="final__errors">ERRORS: {props.match.params.id}</div>
                <img className="final__picture" src="/img/sad_minion.png"/>
            </div>
        </div>
    );
}
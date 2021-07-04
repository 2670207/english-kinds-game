
import React, {useCallback, useContext, useEffect, useState, MouseEvent} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"

export const GameFinishPageSuccess = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    useEffect( () => {
        setTimeout(() => { history.push('/')}, 1500);

        const audio = new Audio('/audio/success.mp3');
        audio.play();

    });

    return (
        <div className="page">
            <div className="final">
                <img className="final__picture" src="/img/congrats-minion.png"/>
            </div>
        </div>
    );
}
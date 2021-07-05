import React, {useCallback, useContext, useEffect, useState, MouseEvent} from 'react'
import { useHistory } from "react-router-dom";
import {CardTypeInterface} from '../typing'


export const CardsForPlay = (props:any) => {
    const [cards, setCards] = useState({items: [], guessed: [], current: {}});
    const [statusGame, setStatusGame] = useState(false);
    const [stars, setStars] = useState<string[]>([]);
    let history = useHistory();

    async function fetchCards (){
       
        const url = props.match.params.id ? `/api/categories/words/${props.match.params.id}` : `/api/words/statistics?field=perSent&order=desc&game=y`;
        const response = await fetch(url);
        const data = await response.json();

        setStatusGame(false);
        setStars([]);

        setCards({
            items: data.map((item: CardTypeInterface) => {item.status = ''; return item} ).sort(() => (Math.random() > .5) ? 1 : -1),
            guessed: [].concat(data).sort(() => (Math.random() > .5) ? 1 : -1), 
            current: {}}
        );

        
    }
    async function saveWrongForCard(card: CardTypeInterface) {
        await fetch(`/api/words/wrong/${card._id}`);
    }
    async function saveCorrectForCard(card: CardTypeInterface) {
        await fetch(`/api/words/correct/${card._id}`);
    }

    useEffect( () => { fetchCards() }, [props.match.params.id]);
        const playWord = (card: CardTypeInterface) => {
        const audio = new Audio(card.audioSrc);
        audio.play();
    }

    const startGameHandler = () => { 
        setStatusGame(true);
        if(cards.guessed[cards.guessed.length - 1]){
            const  card: CardTypeInterface = cards.guessed[cards.guessed.length - 1];
            playWord(card);
        }
        
    }
    const onClickByRepeatHandler = () => {
        if(cards.guessed[cards.guessed.length - 1]){
            const  card: CardTypeInterface = cards.guessed[cards.guessed.length - 1];
            playWord(card);
        }
    }
    const onClickByCardHandler = (card: CardTypeInterface) =>{

        if(JSON.stringify(card)  === JSON.stringify(cards.guessed[cards.guessed.length - 1])){
            saveCorrectForCard(cards.guessed[cards.guessed.length - 1]);
            cards.items.map((item: CardTypeInterface) => {
                if(JSON.stringify(card) === JSON.stringify(item)){
                    card.status = 'success';
                }
                return card;
            })

            cards.guessed.pop();

            if(cards.guessed.length){
                const audio = new Audio(`/audio/correct.mp3`);
                audio.play();

                playWord(cards.guessed[cards.guessed.length - 1]);
                setStars([...stars].concat(['success']))
            }
            
        }else{
            saveWrongForCard(cards.guessed[cards.guessed.length - 1])
            const audio = new Audio(`/audio/error.mp3`);
            audio.play();

            setStars([...stars].concat(['error']))
        }

        if(!cards.guessed.length && statusGame){
            stars.length === 
            cards.items.length - 1 ? 
                history.push('/success') :
                history.push(`/errors/${stars.filter((star) => star === 'error').length}`);
            
        }

    }

  
       return ( 
            <div className={statusGame ? 'game started' : 'game' }> 
                <div className="game__container">
                    {!cards.items.length  ? <div className="loader">LOADIND.....</div> : ''}
                    {cards.items.map((card: CardTypeInterface, index) => {
                        return (    
                            <div  className={"game__card " + card.status} key={index} onClick={() => onClickByCardHandler(card)}
                        data-card-word={card.word} style={{ backgroundImage: `url("${card.image}")`}} ></div>  
                        )
                    })}
                </div>
                <div className="game__stars">
                    {stars.map((star, index) => {
                        return ( <div className={`game__star game__star--${star}`} key={index}></div>)
                    })}
                </div>
                {statusGame && <a className="game__button-paly" onClick={onClickByRepeatHandler}></a>}
                {(cards.items.length && !statusGame) ? <a className="game__button-start" onClick={startGameHandler}>start game</a> : ''}
            </div>
        )


  
}
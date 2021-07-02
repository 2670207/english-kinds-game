import React, {useCallback, useContext, useEffect, useState} from 'react'
import { CardForTraining } from './CardForTraining'

type CardTypeInterface = {
    audioSrc: string,
    word: string,
    image: string,
    translation: string,
}
export const CardsForPlay = (props:any) => {
    const [cards, setCards] = useState([])
    
    async function fetchCards (){
        const responce = await fetch(`/api/categories/words/${props.match.params.id}`);
        const data = await responce.json();
        setCards( () => data);
    }
    useEffect( () => {  fetchCards() }, [props.match.params.id]);

  return ( 
    
    <div className="training"> 
    <h1>Игра!!!</h1>
        {cards.map((card: CardTypeInterface, index) => {
            return (    
                <CardForTraining card={card} key={index}/>
            )
        })}
    </div>
  )
}
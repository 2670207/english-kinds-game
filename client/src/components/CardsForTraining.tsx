import React, {useCallback, useContext, useEffect, useState} from 'react'
import { CardForTraining } from './CardForTraining'

type CardTypeInterface = {
    _id: string,
    audioSrc: string,
    word: string,
    image: string,
    translation: string,
}
export const CardsForTraining = (props:any) => {
    const [cards, setCards] = useState([])
    
    async function fetchCards (){
        const response = await fetch(`/api/categories/words/${props.match.params.id}`);
        const data = await response.json();
        setCards( () => data);
    }
    useEffect( () => {  fetchCards() }, [props.match.params.id]);

  return ( 
    <div className="training"> 
        {cards.map((card: CardTypeInterface, index) => {
            return (    
                <CardForTraining card={card} key={index}/>
            )
        })}
    </div>
  )
}
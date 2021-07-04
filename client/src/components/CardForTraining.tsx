import React, {MouseEvent , useState} from 'react'

type CardTypeInterface = {
    _id: string
    audioSrc: string,
    word: string,
    image: string,
    translation: string,
}
export const CardForTraining = (props:{ card: CardTypeInterface}) => {

    const [rotate, setRotate] = useState(false);
  

    const onClickByCardHandler = async (event: MouseEvent ) => {
        const audio = new Audio(props.card.audioSrc)
        audio.play();

        await fetch(`/api/words/clicks/${props.card._id}`);
    }
    
  return ( 
       <div className={ 'training__flip-card ' +  (rotate ? "training__flip-card-translate " : "")}  
            data-card-audio-src={props.card.audioSrc}  onMouseLeave={() => setRotate(false)}>
                <div className="training__flip-card-container">
                    <div className="training__flip-card-front" 
                        style={{ backgroundImage: `url("${props.card.image}")` }} onClick={onClickByCardHandler}>

                        <div className="training__card-text">{props.card.word}</div>
                        <div className="training__card-rotate" onClick={(event: MouseEvent) =>{ setRotate(true); event.stopPropagation(); }}></div>
                    </div>
                    <div className="training__flip-card-back" style={{ backgroundImage: `url("${props.card.image}")` }}>
                        <div className="training__card-text">{props.card.translation}</div>
                    </div>
                </div>
        </div>
  )
}
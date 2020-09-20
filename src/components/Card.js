import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `place__delete ${isOwn ? '' : 'place__delete_hidden'}`
      );
    
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `place__like ${isLiked ? 'place__like_active' : ''}`;

    function handleClick() {
        props.onClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleCardDelete() {
        props.onCardDelete(props.card)
    }
  

    return (
        <div className="place" key={props.card._id}>
            <img className="place__picture" alt="" src={props.card.link} onClick={handleClick} />
            <button className={cardDeleteButtonClassName} onClick={handleCardDelete}></button>
            <div className="place__textarea">
                <p className="place__text">{props.card.name}</p>
                <div className="place__likesform">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="place__likecount">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card
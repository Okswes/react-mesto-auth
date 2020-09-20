import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext); 

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-block">
                    <img src={currentUser.avatar} className="profile__avatar" alt="Жак-Ив Кусто" />
                    <button className="profile__edit-icon" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <div className="profile__info-grid">
                        <h2 className="profile__title">{currentUser.name}</h2>
                        <button className="edit-button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button className="add-button" onClick={props.onAddPlace}></button>
            </section>

            <section className="place-list">
                {props.cards.map(item => <Card key={item._id} card={item} onClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>)}
            </section>
        </main>
    )
}

export default Main
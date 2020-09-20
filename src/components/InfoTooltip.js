import React from 'react';
import emblemOk from '../images/OkLogin.svg';
import emblemNot from '../images/NotLogin.svg';

function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <div className="popup__infotooltip">
                    <img src={`${props.isLoggedIn ? emblemOk : emblemNot}`} className="popup__login_logo" alt="Логин" />
                    <h3 className="popup__infotooltip-text">{`${props.isLoggedIn ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`}</h3>
                </div>
                <button className="close-button" id="close-button-avatarform" type="reset" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip
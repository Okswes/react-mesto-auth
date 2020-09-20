import React from 'react';


function ImagePopup(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.card.isOpen && 'popup_opened'}`}>
            <div className="popup__picture-container">
                <img className="popup__full-picture" alt={props.card.name} src={props.card.link} />
                <p className="popup__picture-title">{props.card.name}</p>
                <button className="close-button" id="close-button-picture" type="reset" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup
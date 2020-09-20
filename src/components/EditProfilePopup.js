import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            author: name,
            job: description
        });
    }

    return (
        <PopupWithForm title="Редактировать профиль" name="info" buttonName="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
            children={
                <>
                    <input className="popup__item popup__item_el_name" name="author" id="name-input" type="text" required
                        minLength="2" maxLength="40" pattern="[A-Za-zА-ЯЁа-яё -]{1,}" placeholder="Имя" defaultValue={name} onChange={handleNameChange} />
                    <span className="popup__error" id="name-input-error"></span>
                    <input className="popup__item popup__item_el_prof" name="job" id="prof-input" type="text" required
                        minLength="2" maxLength="200" placeholder="Занятие" defaultValue={description} onChange={handleDescriptionChange} />
                    <span className="popup__error" id="prof-input-error"></span>
                </>
            }
        />
    )
}

export default EditProfilePopup
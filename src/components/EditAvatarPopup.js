import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const avaRef = React.useRef();
    const [avatar, setAvatar] = React.useState('');

    React.useEffect(() => {
        setAvatar(currentUser.avatar);
    }, [currentUser]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
                avatar: avaRef.current.value
            }
        );
    }

    function handleAvatarChange(e) {
        setAvatar(e.target.value);
    }


    return (
        <PopupWithForm title="Обновить аватар" name="avatar" buttonName="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
            children={
                <>
                    <input className="popup__item popup__item_el_avatar" name="avatar" id="avatar-input" type="url"
                        placeholder="Ссылка на аватар" required defaultValue={avatar} ref={avaRef} onChange={handleAvatarChange} />
                    <span className="popup__error" id="avatar-input-error"></span>
                </>
            }
        />
    )
}

export default EditAvatarPopup
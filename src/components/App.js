import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import * as Auth from './Auth';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [user, setUser] = React.useState();
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState({
        isOpen: false,
        link: '',
        name: ''
    });

    const [currentUser, setCurrentUser] = React.useState({});
    const history = useHistory();

    const tokenCheck = () => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            Auth.getContent(jwt).then((res) => {
                if (res) {
                    setUser(res.data.email);
                    setLoggedIn(true);
                    history.push('/cards');                    
                }
            });
        }
    }

    React.useEffect(() => {
        tokenCheck();
    }, [loggedIn]) // eslint-disable-line react-hooks/exhaustive-deps

    
    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, initialCards]) => {
                setCurrentUser(user);
                setCards([...initialCards]);
            })
            .catch(err => console.log(err));
    }, [])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        (!isLiked ? api.putLike(card._id) : api.deleteLike(card._id))
            .then((newCard) => {
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                setCards(newCards);
            })
            .catch(err => console.log(err));
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter((c) => c._id !== card._id);
                setCards(newCards);
            })
            .catch(err => console.log(err));
    }


    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(props) {
        setSelectedCard({
            isOpen: true,
            name: props.name,
            link: props.link
        });
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(false);
        setIsInfoTooltipOpen(false);
    }


    function handleUpdateAvatar(data) {
        api.changeAvatar(data)
            .then((newData) => {
                setCurrentUser(newData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    function handleUpdateUser(data) {
        api.changeProfileInfo(data)
            .then((newData) => {
                setCurrentUser(newData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    function handleLogin() {
        setLoggedIn(true);
    }

    function handleInfoTooltip() {
        setIsInfoTooltipOpen(true);
    }

    function signOut(){
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        setUser('');
        history.push('/sign-in');
    }



    function handleUpdateCards(data) {
        api.addNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }
  
    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <Header onSignOut={signOut} user={user} isLoggedIn={loggedIn} />
                <Switch>
                    <ProtectedRoute path="/cards" component={Main} loggedIn={loggedIn} 
                        cards={cards}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardDelete={handleCardDelete}
                        onCardLike={handleCardLike} />
                    <Route path="/sign-in">
                        <Login handleLogin={handleLogin} handleInfoTooltip={handleInfoTooltip} setUser={setUser} />
                    </Route>
                    <Route path="/sign-up">
                        <Register />
                    </Route>
                    <Route>
                        {<Redirect to={`/${loggedIn ? 'cards' : 'sign-in'}`} />}
                    </Route>
                </Switch>
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdatePlace={handleUpdateCards} />
                <PopupWithForm title="Вы уверены?" name="delete" buttonName="Да" onClose={closeAllPopups} />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                <InfoTooltip isLoggedIn={loggedIn} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} />
                <Footer />
            </CurrentUserContext.Provider>
        </>
    );
}

export default App;

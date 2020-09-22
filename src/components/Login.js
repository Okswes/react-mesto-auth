import React from 'react';
import { Link } from 'react-router-dom';

function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        props.onLogin(email, password, setEmail, setPassword);
    }
    return (
        <main className="content">
            <form className="login" onSubmit={handleSubmit}>
                <h3 className="popup__title login__title">Вход</h3>
                <input className="popup__item login__item popup__item_el_email" name="userEmail" id="email-input" type="email" required
                    placeholder="Email" onChange={handleEmailChange} />
                <span className="popup__error" id="email-input-error"></span>
                <input className="popup__item login__item popup__item_el_password" name="userPassword" id="password-input" type="password"
                    required placeholder="Пароль" onChange={handlePasswordChange} />
                <span className="popup__error" id="password-input-error"></span>
                <button className="popup__button login__button" type="submit">Войти</button>
                <Link to='/sign-up' className="login__link">Ещё не зарегистрированы? Регистрация</Link>
            </form>
        </main>
    );
}

export default Login
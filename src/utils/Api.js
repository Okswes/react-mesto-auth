 class Api{
    constructor(options){
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    getUserInfo(){
      return fetch(`${this.baseUrl}/users/me`, {headers: this.headers})
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    getInitialCards(){
       return fetch(`${this.baseUrl}/cards`, {headers: this.headers})
       .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }

    changeProfileInfo(input){
      return fetch(`${this.baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: input.author,
          about: input.job
        })
      }
      )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }


    addNewCard(input){
      return fetch(`${this.baseUrl}/cards`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: input.name,
          link: input.link
        })
      }
      )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }

    putLike(cardId){
      return fetch(`${this.baseUrl}/cards/likes/${cardId}`,{method: 'PUT', headers: this.headers})
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }

    deleteLike(cardId){
      return fetch(`${this.baseUrl}/cards/likes/${cardId}`,{method: 'DELETE', headers: this.headers})
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }

    changeAvatar(input){
      return fetch(`${this.baseUrl}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: input.avatar
        })
      }
      )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }

    deleteCard(cardId){
      return fetch(`${this.baseUrl}/cards/${cardId}`, {method: 'DELETE', headers: this.headers})
       .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
      authorization: 'db48a2d9-d58c-40f0-82e6-c72b8d0b86f5',
      'Content-Type': 'application/json'
  }
});

export default api
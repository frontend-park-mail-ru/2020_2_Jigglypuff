import {moviePage} from "./static/pages/moviePage.js";
import signInPage from "./static/pages/signInPage.js";
import cinemaPage from "./static/pages/cinemaPage.js";
import {profilePage} from "./static/pages/profilePage.js";

export const container = document.getElementsByTagName('main')[0];
let profileRef = document.getElementById('profile-navbar');
let moviesRef = document.getElementById('movies-navbar');
let cinemaRef = document.getElementById('cinema-navbar');

moviesRef.addEventListener('click', evt => {
    evt.preventDefault();
    moviePage();
});

cinemaRef.addEventListener('click', evt => {
    evt.preventDefault();
    cinemaPage();
});

profileRef.addEventListener('click', evt => {
    evt.preventDefault();

    fetch('http://cinemascope.space/getprofile/', {
        method: 'GET',
        credentials: "include",
    })
        .then(({status}) => {
            if (status === 200) {
                profilePage();
            } else {
                signInPage();
            }
        })
        .catch(() => console.log("failed to get profile"));
});

export function isLoginValid(login) {
    if (3 > login.length > 20) {
        return false;
    }
    return !!login.match(/^[0-9a-zA-Z]+$/);
}

export function isPasswordValid(password) {
    if (3 > password.length > 16) {
        return false;
    }
    return !!password.match(/^[0-9a-zA-Z]+$/);
}


moviePage();

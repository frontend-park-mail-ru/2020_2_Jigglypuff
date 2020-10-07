import {ProfileComponent} from "./static/components/Profile/Profile.js";
import moviePage from "./static/pages/moviePage.js";
import signInPage from "./static/pages/signInPage";
import cinemaPage from "./static/pages/cinemaPage";

export const container = document.getElementsByTagName('main')[0];
export const profile = new ProfileComponent({parentElement: container});
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
                profile.render();
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

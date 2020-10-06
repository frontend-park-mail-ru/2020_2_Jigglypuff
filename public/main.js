import {MovieContainerComponent} from "./static/components/MovieContainer/MovieContainer.js";
import {MovieDescriptionComponent} from "./static/components/MovieDescription/MovieDescription.js";
import {CinemaContainerComponent} from "./static/components/CinemaContainer/CinemaContainer.js";
import {ProfileComponent} from "./static/components/Profile/Profile.js";
import {SignUpComponent} from "./static/components/SignUp/SignUp.js";
import {SignInComponent} from "./static/components/SignIn/SignIn.js";

let container = document.getElementsByTagName('main')[0];
let movieContainer = new MovieContainerComponent({parentElement: container});
let cinemaContainer = new CinemaContainerComponent({parentElement: container});
let movieDescription = new MovieDescriptionComponent({parentElement: container});
let profile = new ProfileComponent({parentElement: container});
let signIn = new SignInComponent({parentElement: container});
let signUp = new SignUpComponent({parentElement: container});

movieContainer.render();

let ref = container.getElementsByTagName("a");

Object.keys(ref).map((key) => {
    ref[key].addEventListener('click', evt => {
        evt.preventDefault();
        movieDescription.data = moviesData[key];
        movieDescription.render();
    })
})

let moviesRef = document.getElementById('movies-navbar');
let cinemaRef = document.getElementById('cinema-navbar');
let profileRef = document.getElementById('profile-navbar');

moviesRef.addEventListener('click', evt => {
    evt.preventDefault();
    movieContainer.data = moviesData;
    movieContainer.render()
    // container.innerHTML = window.fest['static/components/MovieContainer/MovieContainer.tmpl'](moviesData)
})

cinemaRef.addEventListener('click', evt => {
    evt.preventDefault();
    cinemaContainer.data = cinemaList;
    cinemaContainer.render();
})


profileRef.addEventListener('click', evt => {
    evt.preventDefault();
    /*profile.data = profileList[1];
    profile.render(); */

    signIn.render();

    let signInForm = document.getElementById('signInForm');
    signInForm.addEventListener('submit', e => {
        e.preventDefault();
        const response = fetch('http://95.163.249.116:8080/signin', {
            method: 'POST',
            body: {
                "Login":"Bussat1223", "Password":"password",
            },
            credentials: "include",
            headers: {
                "Origin": "http://localhost:63342",
            }
        });
        alert (response.statusCode);
    });
});




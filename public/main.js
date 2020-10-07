import {MovieContainerComponent} from "./static/components/MovieContainer/MovieContainer.js";
import {MovieDescriptionComponent} from "./static/components/MovieDescription/MovieDescription.js";
import {CinemaContainerComponent} from "./static/components/CinemaContainer/CinemaContainer.js";
import {ProfileComponent} from "./static/components/Profile/Profile.js";
import {SignUpComponent} from "./static/components/SignUp/SignUp.js";
import {SignInComponent} from "./static/components/SignIn/SignIn.js";

let container = document.getElementsByTagName('main')[0];
let profile = new ProfileComponent({parentElement: container});
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

function moviePage() {
    container.innerHTML = ''

    let movieContainer = new MovieContainerComponent({parentElement: container});
    let movieDescription = new MovieDescriptionComponent({parentElement: container});

    const response = fetch('http://95.163.249.116:8080/getmovielist/?limit=10&page=1');
    response.then((res) => {
            res.json().then(r => {
                movieContainer.data = r;
                movieContainer.render();

                let ref = container.getElementsByTagName("a");
                Object.keys(ref).map((key) => {
                    ref[key].addEventListener('click', evt => {
                        evt.preventDefault();
                        movieDescription.data = movieContainer.data[key];
                        movieDescription.render();
                    })
                })
            });
        }
    ).catch((res) => alert(res.statusCode));
}

function cinemaPage() {
    let cinemaContainer = new CinemaContainerComponent({parentElement: container});

    const response = fetch('http://95.163.249.116:8080/getcinemalist/?limit=10&page=1');
    response.then((res) => {
            res.json().then(r => {
                cinemaContainer.data = r;
                cinemaContainer.render();
            });
        }
    ).catch((res) => alert(res.statusCode));

}

profileRef.addEventListener('click', evt => {
    evt.preventDefault();

    fetch('http://95.163.249.116:8080/getprofile/', {
        method: 'GET',
        credentials: "same-origin",
        headers: {
            "Origin": "http://localhost:63342",
            "Cookie": "session_id=XVlBzgbaiCMRAjWwhTHctcuAxhxKQFDa"
        },
    })
        .then(({status}) => {
            if (status === 200) {
                profile.data = profileList[1];
                profile.render();
            } else {
                signInPage();
            }
        })
        .catch(() => console.log("failed to get profile"));
});


function profilePage() {
    profile.render();
}

function isLoginValid(login) {
    return !!login.match(/^[0-9a-zA-Z]+$/);
}

function isPasswordValid(password) {
    return !!password.match(/^[0-9a-zA-Z]+$/);
}

function signUpPage() {
    const signUp = new SignUpComponent({parentElement: container});
    signUp.render();
    const signUpForm = document.forms["signUpForm"];
    signUpForm.addEventListener('submit', e => {
        e.preventDefault();

        const login = signUpForm.elements.login.value.trim()
        if (!isLoginValid(login)) {
            alert("Invalid login or password!");
            e.preventDefault();
        }

        const password = signUpForm.elements.password.value.trim()
        if (!isPasswordValid(password)) {
            alert("Invalid login or password!");
            e.preventDefault();
        }

        const response = fetch('http://95.163.249.116:8080/signup/', {
            method: 'POST',
            body: '{"Login":"' + login + '", "Password":"' + password + '"}',
            credentials: "same-origin",
            headers: {
                "Origin": "http://localhost:63342",
                "Content-Type":"application/json",
            }
        });

        response
            .then(({status}) => {
                if (status === 200) {
                    alert("Success!");
                    signInPage();
                } else if (status === 401){
                    alert("Something went wrong!");
                }
            })
            .catch(({statusText}) => console.log(statusText));
    });
}


function signInPage() {
    const signIn = new SignInComponent({parentElement: container});
    signIn.render();
    const signInForm = document.forms["signInForm"];
    signInForm.addEventListener('submit', e => {
        e.preventDefault();

        const login = signInForm.elements.login.value.trim()
        if (!isLoginValid(login)) {
            alert("Invalid login or password!");
            e.preventDefault();
        }

        const password = signInForm.elements.password.value.trim()
        if (!isPasswordValid(password)) {
            alert("Invalid login or password!");
            e.preventDefault();
        }

        const response = fetch('http://95.163.249.116:8080/signin/', {
            method: 'POST',
            body: '{"Login":"' + login + '", "Password":"' + password + '"}',
            credentials: "same-origin",
            headers: {
                "Origin": "http://localhost:63342",
                "Content-Type":"application/json"
            },
        });
        response
            .then(({status}) => {
                if (status === 200) {
                    alert("Success!");
                    profilePage();
                } else if (status === 401) {
                    alert("Something went wrong!");
                }
            })
            .catch(({statusText}) => console.log(statusText));
    });

    const signUp = document.getElementById('signUpPage');
    signUp.addEventListener('click', e => {
        e.preventDefault();
        signUpPage();
    });
}

moviePage();
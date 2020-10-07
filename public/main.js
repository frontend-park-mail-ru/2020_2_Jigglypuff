import {MovieContainerComponent} from "./static/components/MovieContainer/MovieContainer.js";
import {MovieDescriptionComponent} from "./static/components/MovieDescription/MovieDescription.js";
import {CinemaContainerComponent} from "./static/components/CinemaContainer/CinemaContainer.js";
import {ProfileComponent} from "./static/components/Profile/Profile.js";
import {SignUpComponent} from "./static/components/SignUp/SignUp.js";
import {SignInComponent} from "./static/components/SignIn/SignIn.js";
import {EditProfileComponent} from "./static/components/EditProfile/EditProfile.js";

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

    const response = fetch('http://cinemascope.space/getmovielist/?limit=10&page=1');
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

    const response = fetch('http://cinemascope.space/getcinemalist/?limit=10&page=1');
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


function profileSettingsPage() {
    let profileSettings = new EditProfileComponent({parentElement: container});
    profileSettings.render();

    const profileSettingsForm = document.forms["profileSettingsForm"]

    profileSettingsForm.addEventListener('submit', evt => {
        evt.preventDefault();
        let name = profileSettingsForm.elements.name.value;
        let surname = profileSettingsForm.elements.surname.value;
        let avatar = profileSettingsForm.elements.avatar.value;

        const formData = new FormData();
        formData.append('Name', name);
        formData.append('Surname', surname);
        formData.append('AvatarPath', avatar);

        const response = fetch('http://cinemascope.space/updateprofile/', {
            method: 'POST',
            body: formData,
            credentials: "include",
            headers: {
                'Content-Type': 'multipart/form-data',
            }});
        response
            .then(({status}) => {
                if (status === 200) {
                    alert("OK");
                } else if (status === 401){
                    alert("Not ok");
                }
            })
            .catch(({statusText}) => console.log(statusText));
    });
}

function profilePage() {
    profile.render();

    const profileSettingsRef = document.getElementById("edit");
    profileSettingsRef.addEventListener('click', e => {
        e.preventDefault();
        profileSettingsPage();
    });
}

function isLoginValid(login) {
    if (3 > login.length > 20) {
        return false;
    }
    return !!login.match(/^[0-9a-zA-Z]+$/);
}

function isPasswordValid(password) {
    if (3 > password.length > 16) {
        return false;
    }
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
            alert("Login's length must be > 3 and < 20 ");
            e.preventDefault();
        }

        const password = signUpForm.elements.password.value.trim()
        if (!isPasswordValid(password)) {
            alert("Password's length must be > 3 and < 16");
            e.preventDefault();
        }

        const response = fetch('http://cinemascope.space/signup/', {
            method: 'POST',
            body: '{"Login":"' + login + '", "Password":"' + password + '"}',
            credentials: "include",
            headers: {
                "Content-Type":"application/json",
            }
        });

        response
            .then(({status}) => {
                if (status === 200) {
                    profilePage();
                } else if (status === 401){
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

        const response = fetch('http://cinemascope.space/signin/', {
            method: 'POST',
            body: '{"Login":"' + login + '", "Password":"' + password + '"}',
            credentials: "include",
            headers: {
                "Content-Type":"application/json"
            },
        });
        response
            .then(({status}) => {
                if (status === 200) {
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
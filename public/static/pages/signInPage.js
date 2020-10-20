import {SignInComponent} from '../components/SignIn/SignIn.js';
import {container, isLoginValid, isPasswordValid} from '../../main.js';
import signUpPage from './signUpPage.js';
import {profilePage} from './profilePage.js';

export default function signInPage() {
    const signIn = new SignInComponent({parentElement: container});
    signIn.render();
    const signInForm = document.forms['signInForm'];
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const login = signInForm.elements.login.value.trim();
        if (!isLoginValid(login)) {
            alert('Invalid login or password!');
            e.preventDefault();
        }

        const password = signInForm.elements.password.value.trim();
        if (!isPasswordValid(password)) {
            alert('Invalid login or password!');
            e.preventDefault();
        }

        const response = fetch('http://cinemascope.space/signin/', {
            method: 'POST',
            body: '{"Login":"' + login + '", "Password":"' + password + '"}',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        response
            .then(({status}) => {
                if (status === 200) {
                    profilePage();
                } else if (status === 401) {
                    alert('Something went wrong!');
                }
            })
            .catch(({statusText}) => console.log(statusText));
    });

    const signUp = document.getElementById('signUpPage');
    signUp.addEventListener('click', (e) => {
        e.preventDefault();
        signUpPage();
    });
}

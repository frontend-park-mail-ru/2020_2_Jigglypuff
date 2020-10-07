import {SignUpComponent} from "../components/SignUp/SignUp";
import {container, isLoginValid, isPasswordValid} from "../../main";
import {profilePage} from "./profilePage";

export default function signUpPage() {
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
                "Content-Type": "application/json",
            }
        });

        response
            .then(({status}) => {
                if (status === 200) {
                    profilePage();
                } else if (status === 401) {
                }
            })
            .catch(({statusText}) => console.log(statusText));
    });
}

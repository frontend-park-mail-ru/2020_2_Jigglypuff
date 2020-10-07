import profileSettingsPage from "./profileSettingsPage.js";
import {container} from "../../main.js";
import {ProfileComponent} from "../components/Profile/Profile.js";

export async function profilePage() {
    let profile = new ProfileComponent({parentElement: container});
    let data = async () => {
        let response = await fetch('http://cinemascope.space/getprofile/', {
            method: 'GET',
            credentials: "include",
        });
        return await response.json();
    };
    profile.data = await data();
    profile.render();

    let profileSettingsRef = document.getElementById("edit");
    profileSettingsRef.addEventListener('click', e => {
        e.preventDefault();
        profileSettingsPage();
    });
}
import profileSettingsPage from "./profileSettingsPage.js";
import {container} from "../../main.js";
import {ProfileComponent} from "../components/Profile/Profile.js";

export function profilePage() {
    let profile = new ProfileComponent({parentElement: container});
    profile.render();

    let profileSettingsRef = document.getElementById("edit");
    profileSettingsRef.addEventListener('click', e => {
        e.preventDefault();
        profileSettingsPage();
    });
}
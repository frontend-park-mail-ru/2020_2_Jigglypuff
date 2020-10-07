import profileSettingsPage from "./profileSettingsPage.js";
import {profile} from "../../main.js";

export function profilePage() {
    profile.render();

    const profileSettingsRef = document.getElementById("edit");
    profileSettingsRef.addEventListener('click', e => {
        e.preventDefault();
        profileSettingsPage();
    });
}
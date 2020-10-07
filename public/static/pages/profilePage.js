import profileSettingsPage from "./profileSettingsPage";
import {profile} from "../../main";

export function profilePage() {
    profile.render();

    const profileSettingsRef = document.getElementById("edit");
    profileSettingsRef.addEventListener('click', e => {
        e.preventDefault();
        profileSettingsPage();
    });
}
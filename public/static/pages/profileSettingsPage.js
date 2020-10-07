import {EditProfileComponent} from "../components/EditProfile/EditProfile.js";
import {container} from "../../main.js";

export default function profileSettingsPage() {
    let profileSettings = new EditProfileComponent({parentElement: container});
    profileSettings.render();

    const profileSettingsForm = document.forms["profileSettingsForm"]

    profileSettingsForm.onsubmit = async (e) => {
        e.preventDefault();
        let response = await fetch('http://cinemascope.space/updateprofile/', {
            method: 'POST',
            body: new FormData(profileSettingsForm),
            credentials: "include",
        });
        await response
            .then(({status}) => {
                if (status === 200) {
                    console.log("update profile ok");
                } else if (status === 401) {
                    console.log("update profile not ok");
                }
            })
            .catch(() => {});
    }
}

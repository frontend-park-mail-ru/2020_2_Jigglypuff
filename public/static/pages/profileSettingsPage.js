import {EditProfileComponent} from '../components/EditProfile/EditProfile.js';
import {container} from '../../main.js';
import {profilePage} from './profilePage.js';

export default function profileSettingsPage() {
    const profileSettings = new EditProfileComponent({parentElement: container});
    profileSettings.render();

    const profileSettingsForm = document.forms['profileSettingsForm'];

    profileSettingsForm.onsubmit = async (e) => {
        e.preventDefault();
        await fetch('http://cinemascope.space/updateprofile/', {
            method: 'POST',
            body: new FormData(profileSettingsForm),
            credentials: 'include',
        });
        profilePage();
    };
}

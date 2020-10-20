import profileSettingsPage from './profileSettingsPage.js';
import {container} from '../../main.js';
import {ProfileComponent} from '../components/Profile/Profile.js';

export async function profilePage() {
    const profile = new ProfileComponent({parentElement: container});
    const data = async () => {
        const response = await fetch('http://cinemascope.space/getprofile/', {
            method: 'GET',
            credentials: 'include',
        });
        return await response.json();
    };
    profile.data = await data();
    profile.render();

    const profileSettingsRef = document.getElementById('edit');
    profileSettingsRef.addEventListener('click', (e) => {
        e.preventDefault();
        profileSettingsPage();
    });
}

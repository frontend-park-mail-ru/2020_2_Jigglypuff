import {EditProfileComponent} from "../components/EditProfile/EditProfile";
import {container} from "../../main";

export default function profileSettingsPage() {
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
            }
        });
        response
            .then(({status}) => {
                if (status === 200) {
                    alert("OK");
                } else if (status === 401) {
                    alert("Not ok");
                }
            })
            .catch(({statusText}) => console.log(statusText));
    });
}

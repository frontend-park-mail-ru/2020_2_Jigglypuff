import {CinemaContainerComponent} from "../components/CinemaContainer/CinemaContainer";
import {container} from "../../main";

export default function cinemaPage() {
    let cinemaContainer = new CinemaContainerComponent({parentElement: container});

    const response = fetch('http://cinemascope.space/getcinemalist/?limit=10&page=1');
    response.then((res) => {
            res.json().then(r => {
                cinemaContainer.data = r;
                cinemaContainer.render();
            });
        }
    ).catch((res) => alert(res.statusCode));

}

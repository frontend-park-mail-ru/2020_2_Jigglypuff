import {CinemaContainerComponent} from '../components/CinemaContainer/CinemaContainer.js';
import {container} from '../../main.js';

export default function cinemaPage() {
    const cinemaContainer = new CinemaContainerComponent({parentElement: container});

    const response = fetch('http://cinemascope.space/getcinemalist/?limit=10&page=1');
    response.then((res) => {
        res.json().then((r) => {
            cinemaContainer.data = r;
            cinemaContainer.render();
        });
    },
    ).catch((res) => alert(res.statusCode));
}

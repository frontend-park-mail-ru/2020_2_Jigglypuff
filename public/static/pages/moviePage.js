import {container} from "../../main.js";
import {MovieDescriptionComponent} from "../components/MovieDescription/MovieDescription.js";
import {MovieContainerComponent} from "../components/MovieContainer/MovieContainer.js";

export async function moviePage() {
    container.innerHTML = ''
    console.log(container);
    let movieContainer = new MovieContainerComponent({parentElement: container});
    let movieDescription = new MovieDescriptionComponent({parentElement: container});

    let rs = await fetch('http://cinemascope.space/getmovielist/?limit=10&page=1');
    movieContainer.data = await rs.json();
    movieContainer.render();

    let ref = container.getElementsByTagName("a");
    Object.keys(ref).map(async (key) => {
        ref[key].addEventListener('click', evt => {
            evt.preventDefault();

            movieDescription.data = movieContainer.data[key];
            movieDescription.render();
            console.log(movieDescription.data.Name);

            const rateButton = document.getElementById('rate');
            const rate = document.getElementsByTagName('select')[0];

            rateButton.addEventListener('click', async event => {
                event.preventDefault();
                console.log("3");
                const rateResponse = await fetch('http://cinemascope.space/ratemovie', {
                    method: 'POST',
                    body: '{"Name":"' + movieDescription.data.Name + '", "Rating":"' + rate.value + '"}',
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                const ratingResponse = await fetch('http://cinemascope.space/getmovierating/?name=' + movieDescription.data.Name);
                movieDescription.data.Rating = await rateResponse.json();
                movieDescription.render();
            });
        });
    });
}

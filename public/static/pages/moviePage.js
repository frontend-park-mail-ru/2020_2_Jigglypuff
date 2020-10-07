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
    Object.keys(ref).map(key => {
        ref[key].addEventListener('click', async evt => {
            evt.preventDefault();

            movieDescription.data = movieContainer.data[key];
            const movieRating = await fetch('http://cinemascope.space/getmovierating/?name=' + movieDescription.data.Name);
            if (movieRating.status === 200) {
                movieDescription.data.Rating = await movieRating.json();
            }
            movieDescription.render();

            const rateButton = document.getElementById('rate');
            const rate = document.getElementsByTagName('select')[0];

            rateButton.addEventListener('click', async event => {
                event.preventDefault();
                console.log("3");
                const rateResponse = await fetch('http://cinemascope.space/ratemovie/', {
                    method: 'POST',
                    body: '{"Name":"' + movieDescription.data.Name + '", "Rating":' + rate.value + '}',
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                const ratingResponse = await fetch('http://cinemascope.space/getmovierating/?name=' + movieDescription.data.Name);
                movieDescription.data.Rating = await ratingResponse.json();
                movieDescription.render();
            });
        });
    });
}

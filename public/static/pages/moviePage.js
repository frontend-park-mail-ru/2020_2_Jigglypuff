import {container} from "../../main.js";
import {MovieDescriptionComponent} from "../components/MovieDescription/MovieDescription.js";
import {MovieContainerComponent} from "../components/MovieContainer/MovieContainer.js";

export default function moviePage() {
    container.innerHTML = ''

    let movieContainer = new MovieContainerComponent({parentElement: container});
    let movieDescription = new MovieDescriptionComponent({parentElement: container});

    const response = fetch('http://cinemascope.space/getmovielist/?limit=10&page=1');
    response.then((res) => {
        res.json().then(r => {
            movieContainer.data = r;
            movieContainer.render();
            console.log("1");
            let ref = container.getElementsByTagName("a");
            Object.keys(ref).map((key) => {
                ref[key].addEventListener('click', evt => {
                    evt.preventDefault();
                    console.log("2");

                    movieDescription.data = movieContainer.data[key];
                    movieDescription.render();

                    const rateButton = document.getElementById('rate');
                    const rate = document.getElementsByTagName('select')[0];

                    rateButton.addEventListener('click', event => {
                        event.preventDefault();
                        console.log("3");
                        const rateResponse = fetch('http://cinemascope.space/ratemovie/', {
                            method: 'POST',
                            body: '{"Name":"' + movieDescription.data.Name + '", "Rating":' + rate.value + '}',
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json"
                            },
                        });
                        rateResponse.then((rateRes) => {
                            if (rateRes.status !== 401) {
                                const ratingResponse = fetch('http://cinemascope.space/getmovierating/?name=' + movieDescription.data.Name);
                                ratingResponse.then(successRatingResponse => {
                                    successRatingResponse.json().then(r => {
                                        console.log("5");
                                        movieContainer.data.Rating = r;
                                        movieContainer.render();
                                    });
                                });
                            } else {
                                movieDescription.render();
                                const rateBtn = document.getElementById("rate");
                                rateBtn.hidden = true;
                            }
                        });
                    });
                });
            });
        });
    }).catch((res) => alert(res.statusCode));
}

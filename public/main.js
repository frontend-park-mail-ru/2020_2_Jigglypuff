import {MovieContainerComponent} from "./static/components/MovieContainer/MovieContainer.js";

let container = document.getElementsByTagName('main')[0];
let movieContainer = new MovieContainerComponent({parentElement: container});
movieContainer.data = moviesData;
movieContainer.render();


let ref = container.getElementsByTagName("a");
console.log(ref)

Object.keys(ref).map((key) => {
    ref[key].addEventListener('click', evt => {
        evt.preventDefault();
        container.innerHTML = window.fest['static/components/MovieDescription/MovieDescription.tmpl'](moviesData[key])
    })
})


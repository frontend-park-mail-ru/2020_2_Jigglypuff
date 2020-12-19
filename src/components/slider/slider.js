import Component from 'components/component';
import template from 'components/slider/slider.hbs';
import BigButton from 'components/baseComponents/buttons/bigButton/bigButton';
import Events from 'consts/Events';
import Routes from 'consts/Routes';

/**
 * Slider component
 * @class
 */
export default class Slider extends Component {
    /**
     * Create a slider
     * @constructor
     * @param {Object} context - slider context
     * */
    constructor(context = {}) {
        super(context);
        this._template = template;


        this._context.BigButton = (new BigButton({
            buttonName: 'Смотреть',
            url: `${Routes.MovieList}${this._context.id}/`,
            event: Events.ChangePath,
        })).render();
    }

    /**
     * Prerender function
     * @return {string} template
     * */
    render() {
        const renderedTemplate = super.render();

        const div = document.createElement('div');
        div.innerHTML = renderedTemplate;
        div.querySelector('.slider__item').setAttribute('style', `background-image: url("${this._context.pathToSliderAvatar}");`);
        return div.innerHTML;
    }
}

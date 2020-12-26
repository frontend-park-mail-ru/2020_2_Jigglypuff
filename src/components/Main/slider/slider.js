import Component from 'components/component';
import template from 'components/Main/slider/slider.hbs';
import BigButton from 'components/BaseComponents/buttons/bigButton/bigButton';
import Events from 'consts/Events';
import Routes from 'consts/Routes';
import EventBus from 'services/EventBus';

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
        this._transform = 0; // значение транфсофрмации .slider_wrapper
        this._positionLeftItem = 0; // позиция левого активного элемента
        this._items = null;
        this._slideHandler = this._scrollSlider.bind(this);
        EventBus.on(Events.ScrollSlider, this._slideHandler);

        this._context.SliderEvent = Events.ScrollSlider;
        for (const i in this._context.movies) {
            if (Object.prototype.hasOwnProperty.call(this._context.movies, i)) {
                this._context.movies[i].BigButton = (new BigButton({
                    buttonName: 'Смотреть',
                    url: `${Routes.MovieList}${this._context.movies[i].id}/`,
                    event: Events.ChangePath,
                })).render();
            }
        }
    }

    /**
     * hide
     */
    hide() {
        Events.off(Events.ScrollSlider, this._slideHandler);
    }

    /**
     * Render slider
     * @return {string}
     */
    render() {
        const renderedTemplate = super.render();

        const div = document.createElement('div');
        div.innerHTML = renderedTemplate;

        const items = div.getElementsByClassName('slider__item');
        let c = 0;
        for (const i of items) {
            i.setAttribute('style', `background-image: url("${this._context.movies[c++].pathToSliderAvatar}");`);
        }
        return div.innerHTML;
    }

    /**
     * scroll Slider
     * @param {Object} data
     *
     */
    _scrollSlider(data) {
        const
            _mainElement = document.querySelector('.slider'); // основный элемент блока
        const _sliderWrapper = _mainElement.querySelector('.slider__wrapper'); // обертка для .slider-item
        const _sliderItems = _mainElement.querySelectorAll('.slider__item'); // элементы (.slider-item)
        const _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width); // ширина обёртки
        const _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width); // ширина одного элемента
        const _step = _itemWidth / _wrapperWidth * 100; // величина шага (для трансформации)

        if (!this._items) {
            this._items = [];
            _sliderItems.forEach((item, index) => {
                this._items.push({item: item, position: index, transform: 0});
            });
        }

        const position = {
            getItemMin: () => {
                let indexItem = 0;
                this._items.forEach((item, index) => {
                    if (item.position < this._items[indexItem].position) {
                        indexItem = index;
                    }
                });
                return indexItem;
            },
            getItemMax: () => {
                let indexItem = 0;
                this._items.forEach((item, index) => {
                    if (item.position > this._items[indexItem].position) {
                        indexItem = index;
                    }
                });
                return indexItem;
            },
            getMin: () => {
                return this._items[position.getItemMin()].position;
            },
            getMax: () => {
                return this._items[position.getItemMax()].position;
            },
        };


        const _transformItem = (direction) => {
            let nextItem;
            if (direction === 'right') {
                this._positionLeftItem++;
                if ((this._positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
                    nextItem = position.getItemMin();
                    this._items[nextItem].position = position.getMax() + 1;
                    this._items[nextItem].transform += this._items.length * 100;
                    this._items[nextItem].item.style.transform = 'translateX(' + this._items[nextItem].transform + '%)';
                }
                this._transform -= _step;
            }
            if (direction === 'left') {
                this._positionLeftItem--;
                if (this._positionLeftItem < position.getMin()) {
                    nextItem = position.getItemMax();
                    this._items[nextItem].position = position.getMin() - 1;
                    this._items[nextItem].transform -= this._items.length * 100;
                    this._items[nextItem].item.style.transform = 'translateX(' + this._items[nextItem].transform + '%)';
                }
                this._transform += _step;
            }
            _sliderWrapper.style.transform = 'translateX(' + this._transform + '%)';
        };


        const direction = data.target.classList.contains('slider__control_right') ? 'right' : 'left';
        _transformItem(direction);
    }
}

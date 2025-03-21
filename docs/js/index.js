class ItcAccordion {
    constructor(target, config) {
        this._el =
            typeof target === 'string'
                ? document.querySelector(target)
                : target;
        const defaultConfig = {
            alwaysOpen: true,
            duration: 350,
        };
        this._config = Object.assign(defaultConfig, config);
        this.addEventListener();
    }

    addEventListener() {
        this._el.addEventListener('click', (e) => {
            const elHeader = e.target.closest('.js-accordion-header');

            if (!elHeader) {
                return;
            }
            if (!this._config.alwaysOpen) {
                const elOpenItem = this._el.querySelector(
                    '.accordion__item_show'
                );
                if (elOpenItem) {
                    elOpenItem !== elHeader.parentElement
                        ? this.toggle(elOpenItem)
                        : null;
                }
            }
            this.toggle(elHeader.parentElement);
        });
    }

    show(el) {
        const elBody = el.querySelector('.accordion__body');
        if (
            elBody.classList.contains('collapsing') ||
            el.classList.contains('accordion__item_show')
        ) {
            return;
        }
        elBody.style['display'] = 'block';
        const height = elBody.offsetHeight;
        elBody.style['height'] = 0;
        elBody.style['overflow'] = 'hidden';
        elBody.style['transition'] = `height ${this._config.duration}ms ease`;
        elBody.classList.add('collapsing');
        el.classList.add('accordion__item_slidedown');
        elBody.offsetHeight;
        elBody.style['height'] = `${height}px`;
        window.setTimeout(() => {
            elBody.classList.remove('collapsing');
            el.classList.remove('accordion__item_slidedown');
            elBody.classList.add('collapse');
            el.classList.add('accordion__item_show');
            elBody.style['display'] = '';
            elBody.style['height'] = '';
            elBody.style['transition'] = '';
            elBody.style['overflow'] = '';
        }, this._config.duration);
    }

    hide(el) {
        const elBody = el.querySelector('.accordion__body');
        if (
            elBody.classList.contains('collapsing') ||
            !el.classList.contains('accordion__item_show')
        ) {
            return;
        }
        elBody.style['height'] = `${elBody.offsetHeight}px`;
        elBody.offsetHeight;
        elBody.style['display'] = 'block';
        elBody.style['height'] = 0;
        elBody.style['overflow'] = 'hidden';
        elBody.style['transition'] = `height ${this._config.duration}ms ease`;
        elBody.classList.remove('collapse');
        el.classList.remove('accordion__item_show');
        elBody.classList.add('collapsing');
        window.setTimeout(() => {
            elBody.classList.remove('collapsing');
            elBody.classList.add('collapse');
            elBody.style['display'] = '';
            elBody.style['height'] = '';
            elBody.style['transition'] = '';
            elBody.style['overflow'] = '';
        }, this._config.duration);
    }

    toggle(el) {
        el.classList.contains('accordion__item_show')
            ? this.hide(el)
            : this.show(el);
    }
}

(() => {
    const accordions = document.querySelectorAll('.js-accordion');

    accordions.forEach((accordion) => {
        new ItcAccordion(accordion, {
            alwaysOpen: true,
        });
    });
})();

(() => {
    document.addEventListener('DOMContentLoaded', function () {
        const offset = 20;

        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const target = document.querySelector(
                    this.getAttribute('href')
                );
                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });
            });
        });
    });
})();

(() => {
    const ACTIVE_CLASS = 'active';
    const nodes = document.querySelectorAll('.js-input-node');

    nodes.forEach((node) => {
        const input = node.querySelector('.js-input');
        const show = node.querySelector('.js-input-show');
        const openIcon = node.querySelector('.js-input-icon-open');
        const closedIcon = node.querySelector('.js-input-icon-closed');
        const alert = node.querySelector('.js-input-alert');
        const reset = node.querySelector('.js-input-reset');

        show?.addEventListener('click', () => {
            const type = input?.getAttribute('type');

            if (type === 'password') {
                input.setAttribute('type', 'text');
                openIcon?.classList.remove('hidden');
                closedIcon?.classList.add('hidden');
            } else {
                input.setAttribute('type', 'password');
                openIcon?.classList.add('hidden');
                closedIcon?.classList.remove('hidden');
            }
        });

        input?.addEventListener('blur', (event) => {
            if (event.target.value === '') {
                alert?.classList.add(ACTIVE_CLASS);
            } else {
                alert?.classList.remove(ACTIVE_CLASS);
            }
        });

        input?.addEventListener('input', (event) => {
            if (event.target.value === '') {
                reset?.classList.remove(ACTIVE_CLASS);

                if (reset && show) {
                    show.classList.remove('shift');
                }
            } else {
                reset?.classList.add(ACTIVE_CLASS);
                alert?.classList.remove(ACTIVE_CLASS);

                if (reset && show) {
                    show.classList.add('shift');
                }
            }
        });

        reset?.addEventListener('click', () => {
            if (input) {
                input.value = '';
                reset?.classList.remove(ACTIVE_CLASS);
            }

            if (reset && show) {
                show.classList.remove('shift');
            }
        });
    });
})();

(() => {
    const sliderElements = document.querySelectorAll('.splide');

    sliderElements.forEach((element) => {
        const slider = new Splide(element, {
            arrows: false,
            pagination: false,
        });

        slider.mount();
    });
})();

//# sourceMappingURL=index.js.map

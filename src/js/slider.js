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

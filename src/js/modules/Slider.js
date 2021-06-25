import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation } from 'swiper/core';

const slider = document.querySelector(".slider");

SwiperCore.use([Navigation]);

export const setupSlider = () => {
    if (slider) {
        const swiper = new Swiper('.swiper-container', {
            loop: true,

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    }
}

export default setupSlider;
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import 'swiper/css/effect-fade';

export const applySwiper = (nodeTarget, swiperCustomOptions = {}) => {
    if (nodeTarget.swiper) {
        nodeTarget.swiper.destroy(true, true);
        nodeTarget.swiper = null;
    };

    const swiperDefaultOptions = {
        direction: "horizontal",
        loop: false,
        allowTouchMove: false,
    };

    const swiperOptions = { ...swiperDefaultOptions, ...swiperCustomOptions };
    new Swiper(nodeTarget, swiperOptions);
};
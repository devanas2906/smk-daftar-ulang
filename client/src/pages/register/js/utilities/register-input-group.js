import { applySwiper } from "../../../../common/js/utilities/swiper.js";

export const applySwiperToRegisterInputGroup = () => {
    const registerInputGroupContainer = document.querySelector('.register-input-group-container');
    applySwiper(registerInputGroupContainer, {});
};
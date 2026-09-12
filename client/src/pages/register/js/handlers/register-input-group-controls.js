import { registerValidation, registerStepValidation } from "../utilities/register-validation.js";
import { applySweetalert2Message } from "../../../../common/js/utilities/sweetalert2.js";

export const handleRegisterInputGroupControlByButton = () => {
    document.body.addEventListener("click", function (event) {
        const registerInputGroupControlButton = event.target.closest(".register-input-group-control-button");

        if (registerInputGroupControlButton) {
            const registerInputGroupContainerSwiper = this.querySelector('.register-input-group-container').swiper;
            const isPreviousButton = registerInputGroupControlButton.classList.contains("register-input-group-control-previous-button");
            const isNextButton = registerInputGroupControlButton.classList.contains("register-input-group-control-next-button");

            if (isPreviousButton) {
                registerInputGroupContainerSwiper.slidePrev();
                updateRegisterStepUI();
            };

            if (isNextButton) {
                const { isValid, message } = registerValidation();
                if (!isValid) return applySweetalert2Message("warning", "Periksa Kembali", message);

                registerInputGroupContainerSwiper.slideNext();
                updateRegisterStepUI();
            };
        };

    });
};

// utilities
const updateRegisterStepUI = () => {
    const { isFinishStep } = registerStepValidation();

    const registerStepLabel = document.querySelector('.register-step-label');
    const registerInputGroupContainerSwiper = document.querySelector('.register-input-group-container').swiper;
    const registerInputGroupControlPreviousButton = document.querySelector(".register-input-group-control-previous-button");
    const registerInputGroupControlNextButton = document.querySelector(".register-input-group-control-next-button");
    const registerSubmitButton = document.querySelector('.register-submit-button');

    const currentRegisterStep = registerInputGroupContainerSwiper.realIndex + 1;
    const allRegisterStep = document.querySelectorAll('.register-input-group-item').length;

    registerStepLabel.textContent = `Langkah ${currentRegisterStep} dari ${allRegisterStep}`;
    registerInputGroupControlPreviousButton.classList.toggle('show', currentRegisterStep > 1);
    registerInputGroupControlNextButton.classList.toggle('hide', isFinishStep);
    registerSubmitButton.classList.toggle('show', isFinishStep);
};
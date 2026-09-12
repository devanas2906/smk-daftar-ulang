const handleOtpVerificationInputAutoForward = () => {
    document.body.addEventListener('input', (event) => {
        const otpVerificationInput = event.target.closest('.otp-verification-input');

        if (otpVerificationInput) {
            const otpVerificationInputValue = otpVerificationInput.value;

            const filteredOtpVerificationInputValue = otpVerificationInputValue.replace(/[^0-9]/g, "");
            const nextOtpVerificationInput = otpVerificationInput.nextElementSibling;

            event.target.value = filteredOtpVerificationInputValue;

            if (otpVerificationInputValue && !nextOtpVerificationInput?.value) nextOtpVerificationInput?.focus();
        };

    });
};

const handleOtpVerificationInputNavigation = () => {
    document.body.addEventListener('keydown', (event) => {
        const otpVerificationInput = event.target.closest('.otp-verification-input');

        if (otpVerificationInput) {
            const otpVerificationInputValue = otpVerificationInput.value;

            const previousOtpVerificationInput = otpVerificationInput.previousElementSibling;
            const nextOtpVerificationInput = otpVerificationInput.nextElementSibling;

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                previousOtpVerificationInput?.focus();
            };

            if (event.key === "ArrowRight") nextOtpVerificationInput?.focus();
            if (event.key === "Backspace" && !otpVerificationInputValue) previousOtpVerificationInput?.focus();
        };

    });
};

export const initializeOtpVerificationInputHandlers = () => {
    handleOtpVerificationInputAutoForward();
    handleOtpVerificationInputNavigation();
};
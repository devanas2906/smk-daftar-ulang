export const applyOtpAttemptTime = (resendOtpTimer, resendOtpButton, nextOtpAttemptTime) => {
    const currentDate = Date.now();
    if (nextOtpAttemptTime < currentDate) return;

    if (!resendOtpTimer || !resendOtpButton) {
        const observer = new MutationObserver(() => {
            const foundResendOtpButton = document.querySelector('.resend-otp-button');
            const foundResendOtpTimer = document.querySelector('.resend-otp-timer');

            if (foundResendOtpTimer && foundResendOtpButton) {
                startOtpCountdown(foundResendOtpTimer, foundResendOtpButton, nextOtpAttemptTime);
                observer.disconnect();
            };
        });

        observer.observe(document.body, { childList: true, subtree: true });
    } else {
        startOtpCountdown(resendOtpTimer, resendOtpButton, nextOtpAttemptTime);
    };
};

// utilities
const startOtpCountdown = (resendOtpTimer, resendOtpButton, nextOtpAttemptTime) => {
    const { otpAttemptTime } = formatOtpAttemptTime(nextOtpAttemptTime);
    resendOtpTimer.textContent = otpAttemptTime;

    resendOtpButton.classList.add("hide");
    resendOtpTimer.classList.add("show");

    const resendTimeId = setInterval(() => {
        const { diffTime, otpAttemptTime } = formatOtpAttemptTime(nextOtpAttemptTime);
        resendOtpTimer.textContent = otpAttemptTime;

        if (diffTime < 0) {
            clearInterval(resendTimeId);
            resendOtpTimer.textContent = '00:00';
            resendOtpButton.classList.remove("hide");
            resendOtpTimer.classList.remove("show");
        };

    }, 1000);
};

const formatOtpAttemptTime = (nextOtpAttemptTime) => {
    const currentDate = Date.now();
    const diffTime = nextOtpAttemptTime - currentDate;
    const minutes = Math.floor(diffTime % (1000 * 60 * 60) / (1000 * 60));
    const seconds = Math.floor(diffTime % (1000 * 60) / 1000);

    const formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formatSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return { diffTime, otpAttemptTime: `${formatMinutes}:${formatSeconds}` };
};
function validateForm() {
    const registrationDateInput = document.getElementById('registeredAt')
    const paymentDateInput = document.getElementById("paymentDate")

    const errorRegistrationDateInput = document.getElementById('errorRegistration')
    const errorPaymentDateInput = document.getElementById('errorPayment')

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDay(),
        year = nowDate.getFullYear();

    if (month.length < 2) {
        month = '0' + month
    }
    if (day.length < 2) {
        day = '0' + day
    }

    const nowString = [year, month, day].join('-')

    resetErrors([registrationDateInput, paymentDateInput],
        [errorRegistrationDateInput, errorPaymentDateInput]);

    let valid = true;

    if (!checkRequired(registrationDateInput.value)) {
        valid = false;
        registrationDateInput.add("error-input");
        errorRegistrationDateInput.innerText = "The field is required.";
    } else if (!checkTextLengthRange(registrationDateInput.value, 5, 30)) {
        valid = false;
        registrationDateInput.classList.add("error-input");
        errorRegistrationDateInput.innerText = "The field should contain 5 to 30 characters.";
    } else if (!checkDate(registrationDateInput.value)) {
        valid = false;
        registrationDateInput.classList.add("error-input");
        errorRegistrationDateInput.innerText = "The field should contain 5 to 30 characters.";
    } else if (!checkDateIfAfter(registrationDateInput.value, nowString)) {
        valid = false
        registrationDateInput.classList.add("error-input")
        errorRegistrationDateInput.innerText = ""
    }

    if (!checkTextLengthRange(paymentDateInput.value, 5, 30)) {
        valid = false;
        paymentDateInput.classList.add("error-input");
        errorPaymentDateInput.innerText = "The field should contain 5 to 30 characters.";
    } else if (!checkDate(paymentDateInput.value)) {
        valid = false;
        paymentDateInput.classList.add("error-input");
        errorPaymentDateInput.innerText = "The field should contain 5 to 30 characters.";
    } else if (checkDateIfAfter(paymentDateInput.value, nowString)) {
        valid = false
        paymentDateInput.classList.add("error-input")
        errorPaymentDateInput.innerText = ""
    }

    if (!valid) {
        errorsSummary.innerText = "Form contains errors.";
    }

    return valid;
}
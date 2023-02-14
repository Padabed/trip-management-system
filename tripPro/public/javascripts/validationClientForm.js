function validateForm() {
    const firstNameInput = document.getElementById('firstName')
    const lastNameInput = document.getElementById('lastName')
    const emailInput = document.getElementById('email')
    const telephoneInput = document.getElementById('telephone')
    const peselInput = document.getElementById('pesel')

    const errorFirstName = document.getElementById('errorFirstName')
    const errorLastName = document.getElementById('errorLastName')
    const errorEmail = document.getElementById('errorEmail')
    const errorTelephone = document.getElementById('errorTelephone')
    const errorPesel = document.getElementById('errorPesel')
    const errorsSummary = document.getElementById('errorsSummary')

    resetErrors([firstNameInput, lastNameInput, emailInput, telephoneInput, peselInput],
                [errorFirstName, errorLastName, errorEmail, errorTelephone, errorPesel]);

    let valid = true;

    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "The field is required.";
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 30)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "The field should contain 2 to 30 characters.";
    }

    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "The field is required.";
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 30)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "The field should contain 2 to 30 characters.";
    }

    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "The field is required.";
    } else if (!checkTextLengthRange(emailInput.value, 5, 30)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "The field should contain 5 to 30 characters.";
    } else if (!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "The field should contain a valid email address.";
    }

    if (!checkRequired(telephoneInput.value)) {
        valid = false;
        telephoneInput.classList.add("error-input");
        errorTelephone.innerText = "The field is required.";
    } else if (!checkTextLengthRange(telephoneInput.value, 6, 30)) {
        valid = false;
        telephoneInput.classList.add("error-input");
        errorTelephone.innerText = "The field should contain 6 to 30 characters.";
    }

    if (!checkRequired(peselInput.value)) {
        valid = false;
        peselInput.classList.add("error-input");
        errorPesel.innerText = "The field is required.";
    } else if (!checkTextLengthRange(peselInput.value, 8, 30)) {
        valid = false;
        peselInput.classList.add("error-input");
        errorPesel.innerText = "The field should contain 8 to 30 characters.";
    }

    if (!valid) {
        errorsSummary.innerText = "Form contains errors.";
    }

    return valid;
}
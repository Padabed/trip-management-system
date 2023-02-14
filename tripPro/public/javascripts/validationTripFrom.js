function validateForm() {

    const nameInput = document.getElementById('name')
    const dateFromInput = document.getElementById('dateFrom')
    const dateToInput = document.getElementById('dateTo')
    const maxPeopleInput = document.getElementById('maxPeople')

    const errorNameInput = document.getElementById('errorName')
    const errorDateFromInput = document.getElementById('errorDateFrom')
    const errorDateToInput = document.getElementById('errorDateTo')
    const errorMaxPeopleInput = document.getElementById('errorMaxPeople')
    const errorsSummary = document.getElementById('errorsSummary')

    resetErrors([nameInput, dateFromInput, dateToInput, maxPeopleInput],
        [errorNameInput, errorDateFromInput, errorDateToInput, errorMaxPeopleInput]);

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

    let valid = true;

    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorNameInput.innerText = "The field is required.";
    } else if (!checkTextLengthRange(nameInput.value, 2, 30)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorNameInput.innerText = "The field should contain 2 to 30 characters.";
    }

    if (!checkRequired(dateFromInput.value)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFromInput.innerText = "The field is required.";
    } else if (!checkTextLengthRange(dateFromInput.value, 5, 30)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFromInput.innerText = "The field should contain 5 to 30 characters.";
    } else if (!checkDate(dateFromInput.value)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFromInput.innerText = "The field should contain 5 to 30 characters.";
    } else if (!checkDateIfAfter(dateFromInput.value, nowString)) {
        valid = false
        dateFromInput.classList.add("error-input")
        errorDateFromInput.innerText = ""
    } else if (checkDate(dateToInput.value)
        && !checkDateIfAfter(dateToInput.value, dateFromInput.value)) {
        valid = false
        dateToInput.classList.add("error-input")
        errorDateToInput.innerText = "The \"Date to\" should be later than the \"Date From\"."
    }

    if (!checkTextLengthRange(dateToInput.value, 5, 30)) {
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateToInput.innerText = "The field should contain 5 to 30 characters.";
    } else if (!checkDate(dateToInput.value)) {
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateToInput.innerText = "The field should contain 5 to 30 characters.";
    }

    if (!checkRequired(maxPeopleInput.value)) {
        valid = false;
        maxPeopleInput.classList.add("error-input");
        errorMaxPeopleInput.innerText = "The field is required.";
    } else if (!checkTextLengthRange(maxPeopleInput.value, 8, 30)) {
        valid = false;
        maxPeopleInput.classList.add("error-input");
        errorMaxPeopleInput.innerText = "The field should contain 8 to 30 characters.";
    } else if (checkNumber(maxPeopleInput.value)) {
        valid = false;
        maxPeopleInput.classList.add("error-input");
        errorMaxPeopleInput.innerText = "The field should contain 8 to 30 characters.";
    }

    if (!valid) {
        errorsSummary.innerText = "Form contains errors.";
    }

    return valid;
}
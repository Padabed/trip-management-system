import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { getTripByIdApiCall } from "../../apiCalls/tripApiCalls";
import { addTripApiCall } from "../../apiCalls/tripApiCalls";
import { updateTripApiCall } from "../../apiCalls/tripApiCalls";
import FormMode from '../../helpers/formHelper'
import FormInput from "../form/FormInputs";
import FormButtons from "../form/FormButtons";
import { checkNumber, checkRequired, checkTextLengthRange, checkDate } from "../../helpers/validations/validationCommon";

function TripForm() {

    const [trip, setTrip] = useState({
        'name': '',
        'dateFrom': '',
        'dateTo': '',
        'maxPeople': ''
    })
    const [errors, setErrors] = useState({
        'name': '',
        'dateFrom': '',
        'dateTo': '',
        'maxPeople': ''
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const { idTrip } = useParams()
    const currentFormMode = idTrip ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()

    function fetchTripDetails() {
        getTripByIdApiCall(idTrip)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                         let newData = {
                            'name': data.name,
                            'dateFrom': data.dateFrom,
                            'dateTo': data.dateTo,
                            'maxPeople': data.maxPeople
                        }
                        setTrip(newData)
                        setMessage(null)
                    }
                    setIsLoaded(true)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                })
    }

    useEffect(() => {
        if (currentFormMode === FormMode.EDIT) {
            fetchTripDetails()
        }
    }, [])

    function handleChange(event) {
        const { name, value } = event.target
        const errorMessage = validateForm(name, value)
        setErrors({
            ...errors,
            [name]: errorMessage
        })
        setTrip({
            ...trip,
            [name]: value
        })
    }

    function validateField(fieldName, fieldValue) {
        let errorMessage = ''

        if (fieldName == 'name'){
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Field is required.'
            } else if (!checkTextLengthRange(fieldValue, 2, 30)) {
                errorMessage = 'Field should contain from 2 to 30 characters'
            }
        }

        if (fieldName == 'dateFrom'){
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Field is required.'
            } else if (!checkDate(fieldValue)) {
                errorMessage = 'Field should contain date'
            }
        }

        if (fieldName == 'dateTo'){
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Field is required.'
            } else if (!checkDate(fieldValue)) {
                errorMessage = 'Field should contain date'
            }
        }

        if (fieldName == 'maxPeople'){
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Field is required.'
            } else if (!checkTextLengthRange(fieldValue, 2, 3)) {
                errorMessage = 'Field should contain from 30 to 150 characters.'
            } else if (!checkNumber(fieldValue)) {
                errorMessage = 'Field should contain valid telephone number'
            }
        }

        return errorMessage;
    }

    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            if (currentFormMode === FormMode.NEW) {
                promise = addTripApiCall(trip)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateTripApiCall(idTrip, trip)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        }
                    )
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                const serverFieldsErrors = {...errors}
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    serverFieldsErrors[fieldName] = errorMessage
                                }
                                setErrors(serverFieldsErrors)
                                setError(null)
                            } else {
                                setRedirect(true)
                            }
                        },
                        (error) => {
                            setError(error)
                        }
                    )
            }
        }
    }

    function validateForm() {
        let isValid = true
        let serverFieldsErrors = {...errors}
        Object.entries(trip).forEach(([key, value]) => {
            const errorMessage = validateField(key, value)
            serverFieldsErrors[key] = errorMessage
            if (errorMessage.length > 0) {
                isValid = false
            }
        })
        setErrors(serverFieldsErrors)
        return isValid
    }

    function hasErrors() {
        let hasErrors = false
        Object.values(errors).forEach((value) => {
            if (value.length > 0) {
                hasErrors = true
            }
        })
        return hasErrors
    }

    useEffect(() => {
        if (redirect) {
            navigate('/trips')
        }
    }, [redirect])

    const errorsSummary = hasErrors() ? 'Form contains errors.' : ''
    const fetchError = error ? `Error: ${error.message}` : ''
    const globalErrorMessage = errorsSummary || fetchError || message
    const pageTitle = currentFormMode === FormMode ? 'New Trip' : 'Edit Trip'

    return (
        <main>
            <h1> { pageTitle } </h1>
            <form className="form" onSubmit={ handleSubmit }>
                <FormInput
                    type="text"
                    label="Name"
                    required
                    error={errors['name']}
                    name="name"
                    placeholder="2-30 characters"
                    onChange={handleChange}
                    value={trip['name']}
                />
                <FormInput
                    type="date"
                    label="dateFrom"
                    required
                    error={errors['dateFrom']}
                    name="dateFrom"
                    placeholder=""
                    onChange={handleChange}
                    value={trip['dateFrom']}
                />
                <FormInput
                    type="date"
                    label="dateTo"
                    required
                    error={errors['dateTo']}
                    name="dateTo"
                    placeholder=""
                    onChange={handleChange}
                    value={trip['dateTo']}
                />
                <FormInput
                    type="number"
                    label="maxPeople"
                    required
                    error={errors['maxPeople']}
                    name="maxPeople"
                    placeholder=""
                    onChange={handleChange}
                    value={trip['maxPeople']}
                />

                <FormButtons
                    formMode={currentFormMode}
                    cancelPath="/trips"
                    error={globalErrorMessage}
                />
            </form>
        </main>
    )
}

export default TripForm
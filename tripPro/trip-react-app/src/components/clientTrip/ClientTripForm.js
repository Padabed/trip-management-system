import { Link, useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { getCTByIdApiCall } from "../../apiCalls/clientTripApiCalls";
import { addCTApiCall } from "../../apiCalls/clientTripApiCalls";
import { updateCTApiCall } from "../../apiCalls/clientTripApiCalls";
import FormMode from '../../helpers/formHelper'
import FormInput from "../form/FormInputs";
import FormButtons from "../form/FormButtons";
import {
    checkDate,
    checkNumber,
    checkRequired,
    checkTextLengthRange
} from "../../helpers/validations/validationCommon";

function CTForm() {

    const [ct, setCT] = useState({
        'idTrip': '',
        'idClient': '',
        'registeredAat': '',
        'paymentDate': ''
    })
    const [errors, setErrors] = useState({
        'idTrip': '',
        'idClient': '',
        'registeredAat': '',
        'paymentDate': ''
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const { idCT } = useParams()
    const currentFormMode = idCT ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()

    function fetchCTDetails() {
        getCTByIdApiCall(idCT)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        let newData = {
                            'idTrip': ct.idTrip,
                            'idClient': ct.idClient,
                            'registeredAat': ct.registeredAat,
                            'paymentDate': ct.paymentDate
                        }
                        setCT(newData)
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
            fetchCTDetails()
        }
    }, [])

    function handleChange(event) {
        const { name, value } = event.target
        const errorMessage = validateForm(name, value)
        setErrors({
            ...errors,
            [name]: errorMessage
        })
        setCT({
            ...ct,
            [name]: value
        })
    }

    function validateField(fieldName, fieldValue) {
        let errorMessage = ''

        if (fieldName == 'idClient'){
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Field is required.'
            } else if (!checkTextLengthRange(fieldValue, 1, 30)) {
                errorMessage = 'Field should contain from 1 to 30 characters'
            } else if (!checkNumber(fieldValue)) {
                errorMessage = 'Field should contain digits'
            }
        }

        if (fieldName == 'idTrip'){
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Field is required.'
            } else if (!checkTextLengthRange(fieldValue, 1, 30)) {
                errorMessage = 'Field should contain from 1 to 30 characters'
            } else if (!checkNumber(fieldValue)) {
                errorMessage = 'Field should contain digits'
            }
        }

        if (fieldName == 'registeredAt'){
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Field is required.'
            } else if (!checkDate(fieldValue)) {
                errorMessage = 'Field should contain date'
            }
        }

        if (fieldName == 'paymentDate'){
            if (!checkDate(fieldValue)) {
                errorMessage = 'Field should contain date'
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
                promise = addCTApiCall(ct)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateCTApiCall(idCT, ct)
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
        Object.entries(ct).forEach(([key, value]) => {
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
            navigate('/cts')
        }
    }, [redirect])

    const errorsSummary = hasErrors() ? 'Form contains errors.' : ''
    const fetchError = error ? `Error: ${error.message}` : ''
    const globalErrorMessage = errorsSummary || fetchError || message
    const pageTitle = currentFormMode === FormMode ? 'New Client Trip' : 'Edit Client Trip'

    return (
        <main>
            <h1> { pageTitle } </h1>
            <form className="form" onSubmit={ handleSubmit }>
                <FormInput
                    type="number"
                    label="Trip ID"
                    required
                    error={errors['idTrip']}
                    name="idTrip"
                    placeholder="1-30 characters"
                    onChange={handleChange}
                    value={ct['idTrip']}
                />
                <FormInput
                    type="number"
                    label="Client ID"
                    required
                    error={errors['idClient']}
                    name="idClient"
                    placeholder="1-30 characters"
                    onChange={handleChange}
                    value={ct['idClient']}
                />
                <FormInput
                    type="date"
                    label="Registration Date"
                    required
                    error={errors['registeredAt']}
                    name="registeredAt"
                    placeholder=""
                    onChange={handleChange}
                    value={ct['registeredAt']}
                />
                <FormInput
                    type="date"
                    label="Payment Date"
                    required
                    error={errors['paymentDate']}
                    name="paymentDate"
                    placeholder=""
                    onChange={handleChange}
                    value={ct['paymentDate']}
                />

                <FormButtons
                    formMode={currentFormMode}
                    cancelPath="/cts"
                    error={globalErrorMessage}
                />
            </form>
        </main>
    )
}

export default CTForm
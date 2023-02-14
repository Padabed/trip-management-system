import { Link, useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { getClientByIdApiCall } from "../../apiCalls/clientApiCalls";
import { addClientApiCall } from "../../apiCalls/clientApiCalls";
import { updateClientApiCall } from "../../apiCalls/clientApiCalls";
import FormMode from '../../helpers/formHelper'
import FormInput from "../form/FormInputs";
import FormButtons from "../form/FormButtons";
import {checkEmail, checkNumber, checkRequired, checkTextLengthRange} from "../../helpers/validations/validationCommon";
import {unHashPassword} from "../../helpers/unHashPass"

function ClientForm() {

    const [cl, setCl] = useState({
        'firstName': '',
        'lastName': '',
        'email': '',
        'telephone': '',
        'password': '',
        'pesel': ''
    })
    const [errors, setErrors] = useState({
        'firstName': '',
        'lastName': '',
        'email': '',
        'telephone': '',
        'password': '',
        'pesel': ''
    })

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const { idClient } = useParams()
    const currentFormMode = idClient ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()

    function fetchClientDetails() {
        getClientByIdApiCall(idClient)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        let newData = {
                            'firstName': data.firstName,
                            'lastName': data.lastName,
                            'email': data.email,
                            'telephone': data.telephone,
                            'password': data.password,
                            'pesel': data.pesel
                        }
                        setCl(newData)
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
            fetchClientDetails()
        }
    }, [])

    function validateField(fieldName, fieldValue) {
        let errorMessage = ''

        if (fieldName == 'firstName'){
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Field is required.'
            } else if (!checkTextLengthRange(fieldValue, 2, 30)) {
                errorMessage = 'Field should contain from 2 to 30 characters'
            }
        }

        if (fieldName == 'lastName'){
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Field is required.'
            } else if (!checkTextLengthRange(fieldValue, 2, 30)) {
                errorMessage = 'Field should contain from 2 to 30 characters.'
            }
        }

        if (fieldName == 'email'){
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Field is required.'
            } else if (!checkTextLengthRange(fieldValue, 5, 60)) {
                errorMessage = 'Field should contain from 5 to 60 characters.'
            } else if (!checkEmail(fieldValue)) {
                errorMessage = 'Field should contain valid email address.'
            }
        }

        if (fieldName == 'telephone'){
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Field is required.'
            } else if (!checkTextLengthRange(fieldValue, 9, 15)) {
                errorMessage = 'Field should contain from 9 to 15 characters.'
            }
        }

        if (fieldName == 'pesel'){
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Field is required.'
            } else if (!checkTextLengthRange(fieldValue, 11, 11)) {
                errorMessage = 'Field should contain 11 characters.'
            } else if (!checkNumber(fieldValue)) {
                errorMessage = 'Field should contain valid Pesel number (11 digits)'
            }
        }

        return errorMessage;
    }

    function handleChange(event) {
        const { name, value } = event.target
        const errorMessage = validateForm(name, value)
        setErrors({
            ...errors,
            [name]: errorMessage
        })
        setCl({
            ...cl,
            [name]: value
        })
    }

    function validateForm() {
        let isValid = true
        let serverFieldsErrors = {...errors}
        Object.entries(cl).forEach(([key, value]) => {
            const errorMessage = validateField(key, value)
            serverFieldsErrors[key] = errorMessage
            if (errorMessage.length > 0) {
                isValid = false
            }
        })
        setErrors(serverFieldsErrors)
        return isValid
    }

    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            if (currentFormMode === FormMode.NEW) {
                promise = addClientApiCall(cl)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateClientApiCall(idClient, cl)
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

    useEffect(() => {
        if (redirect) {
            navigate('/clients')
        }
    }, [redirect])

    function hasErrors() {
        let hasErrors = false
        Object.values(errors).forEach((value) => {
            if (value.length > 0) {
                hasErrors = true
            }
        })
        return hasErrors
    }

    const errorsSummary = hasErrors() ? 'Form contains errors.' : ''
    const fetchError = error ? `Error: ${error.message}` : ''
    const globalErrorMessage = errorsSummary || fetchError || message
    const pageTitle = currentFormMode === FormMode ? 'New Client' : 'Edit Client'

    return (
        <main>
            <h1> { pageTitle } </h1>
            <form className="form" onSubmit={ handleSubmit }>
                <FormInput
                    type="text"
                    label="First name"
                    required
                    error={errors['firstName']}
                    name="firstName"
                    placeholder="2-30 characters"
                    onChange={handleChange}
                    value={cl['firstName']}
                />
                <FormInput
                    type="text"
                    label="Last name"
                    required
                    error={errors['lastName']}
                    name="lastName"
                    placeholder="2-30 characters"
                    onChange={handleChange}
                    value={cl['lastName']}
                />
                <FormInput
                    type="text"
                    label="E-mail"
                    required
                    error={errors['email']}
                    name="email"
                    placeholder="np. name@domain.com"
                    onChange={handleChange}
                    value={cl['email']}
                />
                <FormInput
                    type="text"
                    label="Telephone"
                    required
                    error={errors['telephone']}
                    name="telephone"
                    placeholder=""
                    onChange={handleChange}
                    value={cl['telephone']}
                />
                <FormInput
                    type="text"
                    label="Password"
                    name="password"
                    placeholder=""
                    onChange={handleChange}
                    value={cl['password']}
                />

                <FormInput
                    type="number"
                    label="Pesel"
                    name="pesel"
                    placeholder=""
                    onChange={handleChange}
                    value={cl['pesel']}
                />

                <FormButtons
                    formMode={currentFormMode}
                    cancelPath="/clients"
                    error={globalErrorMessage}
                />
            </form>
        </main>
    )
}

export default ClientForm
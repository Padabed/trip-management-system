const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Field is required";
                break;
            case "string.min":
                err.message = `The field should contain at least ${err.local.limit} characters`;
                break;
            case "string.max":
                err.message = `The field should contain at most ${err.local.limit} characters`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const clientSchema = Joi.object({
    idClient: Joi.number()
        .optional()
        .allow(""),
    firstName: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    lastName: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    email: Joi.string()
        .min(5)
        .max(30)
        .error(errMessages),
    telephone: Joi.string()
        .min(9)
        .required()
        .error(errMessages),
    password: Joi.string()
        .required()
        .error(errMessages),
    pesel: Joi.number()
        .required()
        .error(errMessages)
});

module.exports = clientSchema;




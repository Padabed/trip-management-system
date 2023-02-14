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

const clientTripSchema = Joi.object({
    idCT: Joi.number()
        .optional()
        .allow(""),
    idClient: Joi.number()
        .min(1)
        .max(1000)
        .required()
        .error(errMessages),
    idTrip: Joi.number()
        .min(1)
        .max(1000)
        .required()
        .error(errMessages),
    registeredAt: Joi.date()
        .required()
        .error(errMessages),
    paymentDate: Joi.date()
        .optional()
        .error(errMessages)
});

module.exports = clientTripSchema;




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

const tripSchema = Joi.object({
    idTrip: Joi.number()
        .optional()
        .allow(""),
    name: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    dateFrom: Joi.date()
        .required()
        .error(errMessages),
    dateTo: Joi.date()
        .optional(),
    maxPeople: Joi.number()
        .min(50)
        .required()
        .error(errMessages)
});

module.exports = tripSchema;




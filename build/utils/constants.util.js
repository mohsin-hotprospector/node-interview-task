"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    CODE: {
        OK: 200,
        BAD_REQUEST: 400,
    },
    Messages: {
        EXCEPTION: 'We ran into an error. Please try again later',
        PARAMETERS_MISSING: 'Required parameters are missing',
        INVALID_COUNTRY: 'Invalid country input',
        YEAR_PARAM_INVALID: 'Year should be a numeric input',
    },
    notFoundMessage: (name) => `Unable to find ${name}!`,
    successFoundMessage: (name) => `${name} returned successfully!`,
};
//# sourceMappingURL=constants.util.js.map
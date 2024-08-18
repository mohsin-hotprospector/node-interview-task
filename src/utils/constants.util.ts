export default {
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
  notFoundMessage: (name: string): string => `Unable to find ${name}!`,
  successFoundMessage: (name: string): string =>
    `${name} returned successfully!`,
};

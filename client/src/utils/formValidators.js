const regEx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 *
 * @param {string} emails containing comma separated email addresses
 * @returns list of invalid emails or nothing if there aren't any
 */
export const validateEmails = (emails) => {
  if (!emails) return;
  const invalidEmails = emails
    .split(",")
    .map((email) => email.trim())
    .filter((email) => regEx.test(email) === false); //returns false if email is invalid

  if (invalidEmails.length) {
    return `Invalid email(s): ${invalidEmails}`;
  }
  return;
};

export const required = (value) => (value ? undefined : "Required");

export const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

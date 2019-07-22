const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function validateSignIn(values) {
  const { email, password } = values;

  let errors = {};
  email !== undefined && (errors = validateEmail(email, errors));
  password !== undefined && (errors = validatePassword(password, errors));

  const valuesAreValid = Object.keys(errors).length === 0;
  return { valuesAreValid, errors };
}

export function validateSignUp(values) {
  const { email, password, confirmPassword } = values;

  let errors = {};
  email !== undefined && (errors = validateEmail(email, errors));
  password !== undefined && (errors = validatePassword(password, errors));
  if (confirmPassword !== undefined && password !== undefined) {
    errors = validatePasswordMatch(password, confirmPassword, errors);
  }

  const valuesAreValid = Object.keys(errors).length === 0;
  return { valuesAreValid, errors };
}

// helpers
function validateEmail(email, prevErrors) {
  if (email.trim() === '') {
    return { ...prevErrors, email: 'Email is required' };
  }
  if (!emailRegex.test(email)) {
    return { ...prevErrors, email: 'Invalid email address' };
  }
  return prevErrors;
}

function validatePassword(password, prevErrors) {
  if (password === '') {
    return { ...prevErrors, password: 'Password is required' };
  }
  if (password.length < 6) {
    return { ...prevErrors, password: 'Password must be at least 6 characters' };
  }
  return prevErrors;
}

function validatePasswordMatch(password, confirmPassword, prevErrors) {
  if (password !== confirmPassword) {
    return { ...prevErrors, confirmPassword: 'Passwords did not match' };
  }
  return prevErrors;
}

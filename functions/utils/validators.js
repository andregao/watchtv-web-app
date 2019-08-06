exports.validateEmail = function(email) {
  return notEmpty(email) && validEmailFormat(email);
};

exports.validatePassword = function(password){
  return isStrong(password);
};

exports.validateName = function(name){
  return notEmpty(name);
};

function isStrong(password) {
  return password.length >= 8;
}

function notEmpty(target) {
  return target.trim() !== '';
}

function validEmailFormat(target) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !!(target.match(regex));
}

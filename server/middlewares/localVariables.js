const localVariables = (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
};

module.exports = localVariables;

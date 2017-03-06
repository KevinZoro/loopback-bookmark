module.exports = function() {
  return function resultHandler(req, res, next) {
    console.log('Request tracking middleware triggered on %s--%s.',req.method, req.url);
    next();
  };
};
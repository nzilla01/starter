/* ******************************************
 * Error Controller
 *******************************************/

const errorController = {};

// Controller to deliberately trigger a 500 error
errorController.trigger500 = (req, res, next) => {
  const error = new Error("Intentional 500 Server Error");
  error.status = 500;
  next(error); // Pass it to the global error handler
};

module.exports = errorController;

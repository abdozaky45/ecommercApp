export const asyncHandler = (API) => {
  return (req, res, next) => {
    API(req, res, next).catch((error) => {
      return next(error);
    });
  };
};
export const globalErrorHandling = (error, req, res, next) => {
  console.log({ error: error.message, error, stack: error.stack });
  return res.status(error.cause || 400).json({
    MessageErr: "failure error",
    error: error.message,
    error,
    stack: error.stack,
  });
};

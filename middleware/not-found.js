export const notFound = (req, res, next) => {
  const error = new Error("Not Found");
  error.status = 500;
  return next(error);
};

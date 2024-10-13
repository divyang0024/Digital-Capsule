export default (asyncErrorMiddleware) => async (req, res, next) => {
  try {
    await asyncErrorMiddleware(req, res, next);
  } catch (error) {
    next(error);  
  }
};

export const sendToken = (message, user, res, statusCode) => {
   // Generate JWT token
  const token = user.getJWTToken();
  // Define options for the cookie containing the JWT token
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
   // Set the cookie containing the JWT token in the response
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};

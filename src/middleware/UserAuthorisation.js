async function checkIfUserIsAdmin(request, response, next) {
  //Check is the user is on the request
  // request.customData.user

  // check if the request user has isAdmin set to true
  if (request.customData.user.isAdmin) {
    next();
  } else {
    response.json({
      message: "You need to be an admin to access this API endpoi",
    });
  }
}

module.exports = {
  checkIfUserIsAdmin
}
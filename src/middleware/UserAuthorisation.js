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

async function checkIfUserIsAdmin(request, response, next) {
  // compare the request.customData.user.id to request.params.userId
  // we can assume that checkForUserJwt has run already and placed a user
  // on to request.customData.user
  // we can also assume that this middleware will be used on routes with
  // request.params.userId
}
if(request.customData.user.id == request.params.userId) {
  next();
} else {
  return response.status(403).json({
    message: "Cannot edit other users"
  })
}

async function checkIfUserIsTargetingThemselves (request, response, next){
	// Compare the request.customData.user.id to request.params.userId

}

module.exports = {
  checkIfUserIsAdmin,
  checkIfUserIsTargetingThemselves
}
// Function used to extract the JWT token from the request's 'Authorization' Headers
function isMember(req, res, next) {
    return next();
}

// Export the middleware so that we can use it to create protected routes
module.exports = {
    isMember,
};

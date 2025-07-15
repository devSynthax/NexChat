const { StatusCodes } = require('http-status-codes');

class AuthController {
    async googleOAuthLogin(req, res) {
        try {
            // implement google OAuth login logic here and store user details into database
            return res.status(StatusCodes.OK).json({ message: "Google OAuth login success" });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Error occurred: ' + error.message
            });
        }
    }
}

module.exports = new AuthController();

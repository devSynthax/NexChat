const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');
const AuthController = require('../controller/AuthController');
const passport = require('passport')


// router.post("/register", validate.register, register);
// router.post("/login", passport.authenticate("local", { session: false }), login);
router.get('/', (req, res) => {
    res.send('<a href="/api/v1/auth/google">Login with Google</a>');
});

router.get('/auth/google', passport.authenticate('google', {
    scope: ["profile", "email"],
}));

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/api/v1/auth/success',
    failureRedirect: '/api/v1/auth/failure',
}));

// Callback suces URL for All Platforms
router.get('/auth/success', (req, res) => {
    if (!req.user) {
        let errorResponse = {
            message: "User not found",
            status: StatusCodes.NOT_FOUND,
            data: []
        }
        return res.redirect(`${process.env.CLIENT_URL}/auth-callback?success=false&result=${encodeURIComponent(JSON.stringify(errorResponse))}`);
    }
    let responseObj = {
        message: 'Login successful',
        status: StatusCodes.OK,
        data: req.user,
    }
    const result = encodeURIComponent(JSON.stringify(responseObj));
    return res.redirect(`${process.env.CLIENT_URL}/auth-callback?success=true&result=${result}`);


});

router.get('/auth/failure', (req, res) => {
    let errorResponse = {
        message: "Login failed",
        status: StatusCodes.UNAUTHORIZED,
        data: []
    }
    const result = encodeURIComponent(JSON.stringify(errorResponse));
    return res.redirect(`${process.env.CLIENT_URL}/auth-callback?success=false&result=${result}`);
});


// router.get("/auth/google/callback", passport.authenticate("google", { session: false }), googleCallback);

module.exports = router

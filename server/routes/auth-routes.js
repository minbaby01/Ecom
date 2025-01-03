const express = require("express");
const { registerUser, loginUser, logoutUser, authMiddleware, loginGoogle } = require("../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "Authenticated",
        user: user
    })
})

router.post("/login-google", loginGoogle)
module.exports = router;
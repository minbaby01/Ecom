const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client("613852177193-m42c748l35779qh1m42g0l5g7s8edhud.apps.googleusercontent.com");

// register
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {

        const checkUser = await User.findOne({ email });
        if (checkUser) return res.json({
            success: false,
            message: "Email already exist"
        });

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = User.create({
            userName: userName,
            email: email,
            password: hashPassword
        })

        res.status(200).json({
            success: true,
            message: "Register successfully",
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        });
    }
}



// login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) return res.json({
            success: false,
            message: "User doesn't exist"
        });

        const checkPassword = await bcrypt.compare(password, checkUser.password);
        if (!checkPassword) return res.json({
            success: false,
            message: "Password incorrect"
        });

        const token = jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email,
            userName: checkUser.userName
        }, 'SECRET_KEY', {
            expiresIn: '60m'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false
        }).json({
            success: true,
            message: "Login successfully",
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                userName: checkUser.userName
            }
        })


    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred"
        });
    }
}



// logout
const logoutUser = (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: "Loggout"
    });
}

// middleware
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorised user"
        })
    }

    try {
        let decoded = jwt.verify(token, "SECRET_KEY");
        
        // if (!decoded) {
        //     decoded = jwt.decode(token);
        //     req.user = decoded;
        //     next();
        // }

        req.user = decoded;
        next();

    } catch (error) {        
        res.status(401).json({
            success: false,
            message: "Unauthorised user"
        });
    }
}
const loginGoogle = async (req, res) => {
    const credential = req.body.token

    if (!credential) {
        return res.status(401).json({
            success: false,
            message: "Unauthorised user"
        })
    }

    try {
        const decoded = jwt.decode(credential);

        let checkUser = await User.findOne({ email: decoded.email });

        if (!checkUser) {
            checkUser = await User.create({
                userName: decoded.email,
                email: decoded.email,
                role: "User",
                password: "1234567890"
            })
        }

        res.cookie('token', credential, {
            httpOnly: true,
            secure: false
        }).json({
            success: true,
            message: "Login successfully",
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                userName: checkUser.userName
            }
        })
    } catch (error) {
        console.log(error);

        res.status(401).json({
            success: false,
            message: "Unauthorised user"
        });
    }
}


module.exports = { registerUser, loginUser, logoutUser, authMiddleware, loginGoogle };
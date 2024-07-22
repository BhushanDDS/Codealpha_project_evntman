import { User } from "../Models/userModel.js"
import bcrypt from 'bcrypt'
import JWT from "jsonwebtoken"

const registerUser = async(req, res) => {

    try {
        const [name, email, password] = req.body

        if (
            [name, email, password].some((field) => field.trim() === "")
        ) {
            return res.status(400).json({
                msg: "all fields required"
            })

        }


        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register please login",
            });
        }

        const hashedPass = await bcrypt.hash(password, 10)

        const user = await new User({
            name,
            email,
            password: hashedPass
        }).save();

        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Errro in Registeration",
            error,
        });
    }
}

export const comparePassword = async(password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}

const loginUser = async(req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd",
            });
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }

        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECREAT, {
            expiresIn: "7d",
        });

        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });

    } catch (error) {

        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });

    }



}


const logout = () => {

}


const updateUserInfo = async(req, res) => {

    const [name] = req.body
    if (!name) {
        return res.status(200).json({
            message: "name required"
        })

    }

    const user = await User.findByIdAndUpdate(
        req.user._id, {
            $set: {
                name
            }
        }, { new: true }
    ).select("-password")


    res.status(201).send({
        success: true,
        message: "User Updated Successfully",
        user,
    });



}


const changePassword = async(req, res) => {
    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user._id)

    const ispasswordcorrect = bcrypt.compare(user.password, oldPassword)
    if (!ispasswordcorrect) {
        res.status(200).send({
            success: true,
            message: " password incorrect ",
            user,
        });
    }
    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    res.status(201).send({
        success: true,
        message: "password changed",
        user,
    });

}


export {
    registerUser,
    loginUser,
    logout,
    updateUserInfo,
    changePassword
}
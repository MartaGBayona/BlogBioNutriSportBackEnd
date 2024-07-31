import bcrypt from "bcrypt"
import User from "../models/User.js"

import Jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { name, email, password} = req.body;

        if (password.length < 6 || password.length > 10) {
            return res.status(400).json({
                success: false,
                message: "Password must contain between 6 and 10 characters"
            })
        }

        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json({
                success: false,
                message: "format email invalid"
            })
        }

        const existingUser = await User.findOne(
            {
                email:email
            }
        )

        if(existingUser) {
            return res.status(400).json({
                suceess: false,
                message: "Email address is already in use",
            })
        }

        const passwordEncrypted = bcrypt.hashSync(password, 5)

        const newUser = await User.create(
            {
                name: name,
                email: email,
                password: passwordEncrypted
            }
        )
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser
        })

    } catch (error) {
        return res.status(500).json({
            suceess: false,
            message: "Cant register user",
        })
    }
}
import mongoose from 'mongoose';
import Admin from '../models/admin.model.js';
import axios from 'axios';
import User from '../models/user.model.js';

async function TULogin(loginData) {
    const loginResponse = await axios.post(process.env.TULOGIN_URI, loginData, {
        headers: {
            "Content-Type": "application/json",
            "Application-Key": process.env.TU_APPLICATION_KEY
        }
    })
    .then((response) => response.data)
    .catch((e) => {
        console.log("login Failed: " + e.message);
        return e.message
    })
    
    return loginResponse;
}

export const login = async (req, res) => {
    const loginData = req.body;
    
    TULogin(loginData)
        .then(async data => {
            if(data.status) {
                const checkUser = await User.exists({ username: data.username });
                if(checkUser == null) {
                    const newUser = new User(
                        {
                            displayNameTH: data.displayname_th,
                            displayNameEN: data.displayname_en,
                            username: data.username,
                            email: data.email,
                            department: data.department,
                            faculty: data.faculty
                        }
                    );

                    await newUser.save();
                    console.log("new user data added!");
                }
                return res.status(200).json({ success: true, data: data });
            } else {
                console.log("Error: Unauthorized")
                return res.status(401).json({ success: false, message: data });
            }
        })
}
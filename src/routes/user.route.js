import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.post('/signup', async (req, res)=>{
    const createdUser = await User.create(req.body)
    res.status(201).json(createdUser)
})


export default router
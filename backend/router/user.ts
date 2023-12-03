import express from 'express';
import { getUsers, getUserByEmail, deleteUser, 
    updatePassword, updateData } from '../controller/user';

const userRouter = express.Router();

userRouter.get("/", getUsers); 
userRouter.get("/:email", getUserByEmail);
userRouter.put("/:email", updateData); 
userRouter.put("/password/:email", updatePassword); 
userRouter.delete("/:email", deleteUser); 

export default userRouter;
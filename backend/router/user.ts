import express from 'express';
import { signUp, getUsers, getUserByEmail, getUserById, deleteUserByEmail, 
    updatePassword, updateData } from '../controller/user';

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:email", getUserByEmail);
userRouter.get("/:id", getUserById);
userRouter.post("/signup", signUp);
userRouter.delete("/:email", deleteUserByEmail);
userRouter.put("/:email", updateData);
userRouter.put("/password/:email", updatePassword);


export default userRouter;
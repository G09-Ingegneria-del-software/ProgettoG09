import express from 'express';
import { signUp, getUsers, getUserByEmail, getUserById, deleteUserByEmail, 
    updatePassword, updateData, toggleBlock } from '../controller/user';

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/email/:email", getUserByEmail);
userRouter.get("/:id", getUserById);
userRouter.post("/signup", signUp);
userRouter.put("/:email", updateData);
userRouter.put("/password/:email", updatePassword);
userRouter.put("/block/:email", toggleBlock);
userRouter.delete("/:email", deleteUserByEmail);

export default userRouter;
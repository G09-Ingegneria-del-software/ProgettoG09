import express from "express";
import User, {UserType} from "../models/user";

// Create new user in signup
export const signUp = (req: express.Request, res: express.Response) => {
    User.findOne({email: req.body.email}, (err: Error | null, user: UserType | null) => {
        if (!user) {
            // create it
            const newUser = new User({
                _id : req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                isBlocked: false
            });

            newUser.save()
            .then((data: UserType) => {
                console.log(data);
                res.status(201).send('User created');
            })
            .catch((err: Error) => {
                console.error(err);
                res.status(500).send('Internal Server Error');
            });

        }else {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                // already exists
                res.status(409).send('User already exists');
            }
        }
    });
};

// Get users
export const getUsers = (req: express.Request, res: express.Response) => {
    User.find({}, (err: Error, users: UserType[]) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send(users);
        }
    });
}

// Get user by email
export const getUserByEmail = (req: express.Request, res: express.Response) => {
    User.findOne({email: req.params.email}, (err: Error, user: UserType | null) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            if (!user){
                res.status(404).send("User not found");
            }else {
                res.status(200).send(user);
            }
        }
    });
}

// Get user by id
export const getUserById = (req: express.Request, res: express.Response) => {
    User.findById(req.params.id, (err: Error, user: UserType | null) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            if (!user){
                res.status(404).send("User not found");
            }else {
                res.status(200).send(user);
            }
        }
    });
}

// Delete user by email
export const deleteUserByEmail = async (req: express.Request, res: express.Response) => {
    let data = await User.findOne({email: req.params.email}).exec();

    if (!data){
        return res.status(404).send("User not found");
    }else {
        await User.deleteOne({username: req.params.username});
        return res.status(204).send();
    }
};

// Update user data
export const updateData = (req: express.Request, res: express.Response) => {
    User.findOne({email: req.params.email}, (err: Error, user: UserType | null) => {
        if(!user) {
            return res.status(404).send("User not found");
        } else {
            if(err) return res.status(500).json({Error: err});

            User.updateOne({email: req.params.email}, req.body, (err: Error) => {
                if(err) return res.status(500).json({Error: err});
                user = req.body;
                return res.status(200).json(user);
            });
        }
    });
};

export const updatePassword = (req: express.Request, res: express.Response) => {
    User.findOne({email: req.params.email}, (err: Error, user: UserType | null) => {
        if(!user) {
            return res.status(404).send("User not found");
        } else {
            if(err) return res.status(500).json({Error: err});

            User.updateOne({email: req.params.email}, 
                { $set: {password: req.body.password,}}, (err: Error) => {
                
                if(err) return res.status(500).json({Error: err});
                user = req.body;
                return res.status(200).json(user);
            });
        }
    });
};
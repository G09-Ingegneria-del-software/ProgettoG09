import express from "express";
import Chat, {ChatType} from "../models/chat";

// Create new chat
export const createChat = (req: express.Request, res: express.Response) => {
        let newChat = new Chat({
            _id : req.body._id,
            user: req.body.user,
            categories: req.body.categories,
            date: req.body.date,
            messages: req.body.messages,
        });

        newChat.save()
        .then((data: ChatType) => {
            console.log(data);
            res.status(201).send('Chat created');
        })
        .catch((err: Error) => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
}

// Get all chats
export const getChats = (req: express.Request, res: express.Response) => {
    Chat.find()
    .then((data: ChatType[]) => {
        res.status(200).send(data);
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}

// Get all chats by user
export const getChatsByUser = (req: express.Request, res: express.Response) => {
    Chat.find({user: req.body.user})
    .then((data: ChatType[]) => {
        res.status(200).send(data);
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}

// Delete chat by id
export const deleteChatById = (req: express.Request, res: express.Response) => {
    Chat.findByIdAndDelete(req.body._id)
    .then((data: ChatType | null) => {
        if (data) {
            res.status(200).send('Chat deleted');
        } else {
            res.status(404).send('Chat not found');
        }
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}

// Add message to chat by id
export const addMessage = async (req: express.Request, res: express.Response) => {
    let newMessage = req.body.message;

    let chat = await Chat.findById(req.body._id).exec();
    if (chat) {
        chat.messages.push(newMessage);
        chat.save()
        .then((data: ChatType) => {
            res.status(200).send('Message added');
        })
        .catch((err: Error) => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
    }else{
        res.status(404).send('Chat not found');
    }
};

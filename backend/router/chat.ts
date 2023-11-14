import express from 'express';
import { createChat, getChats, getChatsByUser, addMessage, deleteChatById } from '../controller/chat';

const chatRouter = express.Router();

chatRouter.post('/', createChat);
chatRouter.get('/chats', getChats);
chatRouter.get('/', getChatsByUser);
chatRouter.put('/:id', addMessage);
chatRouter.delete('/:id', deleteChatById);

export default chatRouter;
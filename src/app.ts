import express from "express";
import { deleteUserAvatar, getUser, getUserAvatar,  } from "./api/controllers/user";

const app = express();

app.get("/api/user/:userId", getUser);

app.get("/api/user/:userId/avatar", getUserAvatar);

app.delete("/api/user/:userId/avatar", deleteUserAvatar);

export default app;

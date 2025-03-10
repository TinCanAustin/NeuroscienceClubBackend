import express, { Request, Response } from 'express';
import session from "express-session";
import path from 'path';
import { config } from "dotenv";
import cors from 'cors';

import userRouter from './routes/exec';
import eventRouter from './routes/events';
import announcementRouter from './routes/announcemnets';
import authRouter from './routes/auth';

const app = express();
config({path: path.join(__dirname, ".env")})
const HOUR_VAR = 60000 * 60;

app.use(express.json());
app.use(session({
    secret: `${process.env.SECRET}`,
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: HOUR_VAR
    }
}));
app.use(cors());

app.get("/", (req : Request, res : Response)=>{
    res.sendFile(path.join(__dirname, "view", "index.html"));
});

app.use('/auth', authRouter);
app.use('/execs', userRouter);
app.use('/events', eventRouter);
app.use('/announcement', announcementRouter);

app.listen(3000, ()=>{
    console.log("Ola camosa");
});
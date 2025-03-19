import express, { Request, Response } from 'express';
import session from "express-session";
import path from 'path';
import { config } from "dotenv";
import cors from 'cors';

import userRouter from './routes/exec';
import eventRouter from './routes/events';
import announcementRouter from './routes/announcemnets';
import authRouter from './routes/auth';
import userForm from './routes/form';

const app = express();
config({path: path.join(__dirname, ".env")})
const HOUR_VAR = 60000 * 60;

const allowedOrgin = [
    "http://localhost:5173",
    'https://adminlogin.pages.dev'
]

console.log("CORS origin:", process.env.NODE_ENV === 'production' ? 'https://adminlogin.pages.dev' : 'http://localhost:5173');

app.use(cors({
    origin: (origin, callback) => {
        if(!origin || allowedOrgin.includes(origin)){
            callback(null, true);
        }else{
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: `${process.env.SECRET}`,
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: HOUR_VAR,
        httpOnly: true,
        sameSite: "none",
        secure: true,
        domain: 'neuroscienceclubbackend-production.up.railway.app'
    }
}));
app.set('trust proxy', 1);

app.get("/", (req : Request, res : Response)=>{
    res.sendFile(path.join(__dirname, "view", "index.html"));
});

app.use('/auth', authRouter);
app.use('/execs', userRouter);
app.use('/events', eventRouter);
app.use('/announcement', announcementRouter);
app.use('/form', userForm);

app.listen(3000, ()=>{
    console.log("Ola camosa");
});
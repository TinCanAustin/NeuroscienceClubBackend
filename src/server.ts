import express, { Request, Response } from 'express';
import path from 'path';
import userRouter from './routes/exec';
import eventRouter from './routes/events';

const app = express();

app.use(express.json());

app.get("/", (req : Request, res : Response)=>{
    res.sendFile(path.join(__dirname, "view", "index.html"));
});

app.use('/execs', userRouter);
app.use('/events', eventRouter);

app.listen(3000, ()=>{
    console.log("Ola camosa");
});
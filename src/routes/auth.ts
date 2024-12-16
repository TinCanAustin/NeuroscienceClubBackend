import { Request, Response, Router } from "express";
import { authType } from "../dtos/auth.dot";
import { config } from "dotenv";
import path from 'path';

config({path: path.resolve(__dirname, "../.env")});

const authRouter = Router();

authRouter.post("/", 
    (req: Request<{}, {}, authType>, res: Response)=>{
        const username = req.body.username;
        const password = req.body.password;

        if(username != process.env.USERNAME && password != process.env.PASSWORD){
            res.status(401).json({"error" : true, "message" : "invalid username or password"});
            return;
        }

        res.status(200).json({"error": false, "message": "Login sucessful"});
    }
);

export default authRouter;
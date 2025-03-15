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

        if(username != process.env.USERNAME || password != process.env.PASSWORD){
            res.status(401).json({"error" : true, "message" : "invalid username or password"});
            return;
        }
        // console.log(req.session.id);
        //@ts-ignore
        req.session.auth = true;
        res.status(200).json({"error": false, "message": "Login sucessful"});
    }
);

authRouter.get("/validate", 
    (req: Request, res: Response)=>{
        // @ts-ignore
        if(!req.session.auth){
            res.status(200).json({'error': false, 'valid': false});
            return;
        };
        res.status(200).json({'error': false, 'valid': true});
    }
);

export default authRouter;
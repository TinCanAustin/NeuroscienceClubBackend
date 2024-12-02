import { Request, Response, Router } from "express";
import { addEventType } from "../dtos/event.dot";

const eventRouter = Router();

eventRouter.post("/add", 
    (req: Request<{}, {}, addEventType>, res: Response)=>{
        const name = req.body.name;
        const date = req.body.date;
        const status = req.body.status;
        const bannerURL = req.body.status;

        if(name != undefined && date != undefined && status != undefined && bannerURL != undefined){
            
        }else{
            res.status(400).json({error: true, message: "wat are you doing"});
        }
    }
);

export default eventRouter;
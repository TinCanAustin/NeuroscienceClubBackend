import { Request, Response, Router } from "express";  
import { addExecType } from "../dtos/addExec.dto";

const userRouter = Router();

userRouter
.route("/add")
.post(
    (req : Request<{}, {}, addExecType>, res : Response)=>{
        const id = req.body.id;
        const name = req.body.name;
        const stream = req.body.stream;
        const url = req.body.linkedin;

        if(id != undefined && name != undefined && stream != undefined){
            if(url != undefined && url != null){
                console.log(`User with id ${id}, is ${name}, from ${stream} with link ${url}`);
            }else{
                console.log(`User with id ${id}, is ${name}, from ${stream}`);
            }
            res.status(200).json({'error': false, 'message': "kys"});
        }else{
            res.status(400).json({'error': false, 'message': "wat are you doing"});
        }
    }
)

export default userRouter;
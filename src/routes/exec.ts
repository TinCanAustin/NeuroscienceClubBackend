import { Request, Response, Router } from "express";  
import { addExecType } from "../dtos/addExec.dto";
import { insertExec } from "../drizzel/query";
import { exec } from "../drizzel/schema";

const userRouter = Router();

userRouter
.route("/add")
.post(
    async (req : Request<{}, {}, addExecType>, res : Response)=>{
        const name = req.body.name;
        const stream = req.body.stream;
        const url = req.body.linkedin;

        if(name != undefined && stream != undefined){
            
            const newExec:exec = {name: name, stream: stream};

            if(url != undefined && url != null){
                newExec.linkedin = url;
                console.log(`User is ${name}, from ${stream} with link ${url}`);
            }else{
                console.log(`User is ${name}, from ${stream}`);
            }
            
            try{
                await insertExec(newExec);
                res.status(200).json({'error': false, 'message': "kys"});
            }catch (err){
                console.log(err);
                res.status(500).json({'error': true, 'message': "Internal error"});
            }
        }else{
            res.status(400).json({'error': true, 'message': "wat are you doing"});
        }
    }
)

export default userRouter;
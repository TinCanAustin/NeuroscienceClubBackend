import { Request, Response, Router } from "express";  
import { addExecType, idExecParamType } from "../dtos/Exec.dto";
import { insertExec} from "../drizzel/query";
import { exec, execTable } from "../drizzel/schema";

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
                // await insertExecTry(name, stream, url!);
                res.status(200).json({'error': false, 'message': "added sucessfully"});
            }catch (err){
                console.log(err);
                res.status(500).json({'error': true, 'message': "Internal error"});
            }
        }else{
            res.status(400).json({'error': true, 'message': "wat are you doing"});
        }
    }
)

userRouter
.route("/delete/:id")
.post(
    async (req: Request<idExecParamType>, res : Response)=>{
        const exec_id = req.params.id;

        console.log(exec_id);

        res.status(200).json({error: false, message: "deleted successfully"});
    }
)



export default userRouter;
import { Request, Response, Router } from "express";  
import { addExecType, idExecParamType } from "../dtos/Exec.dto";
import { deleteExec, getExec, insertExec} from "../drizzel/query";
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
            
            const newExec:Omit<exec, "id"> = {name: name, stream: stream};

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
                res.status(500).json({'error': true, 'message': "Internal error", 'error message': err});
            }
        }else{
            res.status(400).json({'error': true, 'message': "wat are you doing"});
        }
    }
)

userRouter
.route("/delete")
.post(
    (req: Request, res: Response)=>{
        res.status(400).json({error: true, message: "Please enter a vaild ID"});
    }
)

userRouter
.route("/delete/:id")
.post(
    async (req: Request<idExecParamType>, res : Response)=>{
        try{
            const exec_id = req.params.id;
            
            if(!Number(exec_id)){
                res.status(400).json({error: true, message: "Please Enter a vaild id"});
                return;
            }

            const deleted : exec[] = await deleteExec(Number(exec_id));

            if(deleted.length == 0){
                res.status(400).json({error: true, message: "Exec not found."});
                return;
            }

            res.status(200).json({error: false, message: "deleted successfully", deleted_accout : deleted});
        }catch(err){
            console.log(err);
            res.status(500).json({error: true, message: "Internal error", error_message: err});
        }
    }
)

userRouter
.route("/get")
.get(
    (req: Request, res: Response)=>{
        res.status(400).json({error: true, message: "Please enter a vaild ID"});
    }
)

userRouter
.route("/get/:id")
.get(
    async (req: Request<idExecParamType>, res : Response)=>{
        try{
            const exec_id = req.params.id;
            
            if(!Number(exec_id)){
                res.status(400).json({error: true, message: "Please Enter a vaild id"});
                return;
            }
            
            const user = await getExec(Number(exec_id));
            
            if( user.length == 0 ){
                res.status(400).json({error: true, message: "Exec not found."});
                return;
            }

            res.status(200).json({error: false, message: "exec found", user: user});
        }catch(err){
            console.log(err);
            res.status(500).json({error: true, message: "Internal error", error_message: err});
        }
    }
)


export default userRouter;
import { Request, Response, Router } from "express";  
import { addExecType, idExecParamType } from "../dtos/Exec.dto";
import { deleteExec, getExec, getExecs, insertExec} from "../drizzel/query";
import { exec, execTable } from "../drizzel/schema";

const userRouter = Router();

userRouter
.route("/add")
.post(
    async (req : Request<{}, {}, addExecType>, res : Response)=>{
        // @ts-ignore
        if(!req.session.auth){
            res.status(401).json({'error': true, 'message': "No autherization"});
            return;
        };

        const name = req.body.name;
        const stream = req.body.stream;
        const position = req.body.position;
        const url = req.body.linkedin;
        const pfp = req.body.profilePic;

        if(name != undefined && stream != undefined && position != undefined){
            
            const newExec:Omit<exec, "id"> = {name: name, stream: stream, position: position};

            if(url != undefined && url != null){
                newExec.linkedin = url;
            }
            if(pfp != undefined && pfp != null){
                newExec.profilePic = pfp;
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
        // @ts-ignore
        if(!req.session.auth){
            res.status(401).json({'error': true, 'message': "No autherization"});
            return;
        };
        res.status(400).json({error: true, message: "Please enter a vaild ID"});
    }
)

userRouter
.route("/delete/:id")
.post(
    async (req: Request<idExecParamType>, res : Response)=>{
        // @ts-ignore
        if(!req.session.auth){
            res.status(401).json({'error': true, 'message': "No autherization"});
            return;
        };
        
        try{
            const exec_id = req.params.id;

            const deleted : exec[] = await deleteExec(exec_id);

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
.route("/")
.get(
    async (req: Request, res: Response)=>{
        // @ts-ignore
        if(!req.session.auth){
            res.status(401).json({'error': true, 'message': "No autherization"});
            return;
        };
        try{
            const execs = await getExecs();
            if(execs.length == 0){
                res.status(204).json({'error': true, 'message': "No execs in db"});
                return;
            }
            res.status(200).json({'error': false, 'execs': execs});
        }catch(err){
            console.log(err);
            res.status(500).json({'error': true, 'message': 'internal error'})
        }
    }
)

userRouter
.route("/:id")
.get(
    async (req: Request<idExecParamType>, res : Response)=>{
        // @ts-ignore
        if(!req.session.auth){
            res.status(401).json({'error': true, 'message': "No autherization"});
            return;
        };
        try{
            const exec_id = req.params.id;
            
            const user = await getExec(exec_id);
            
            if( user.length == 0 ){
                res.status(400).json({error: true, message: "Exec not found."});
                return;
            }

            res.status(200).json({error: false, user: user[0]});
        }catch(err){
            console.log(err);
            res.status(500).json({error: true, message: "Internal error", error_message: err});
        }
    }
)


export default userRouter;
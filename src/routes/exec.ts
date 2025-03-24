import { Request, Response, Router } from "express";  
import { addExecType, idExecParamType } from "../dtos/Exec.dto";
import { deleteExec, getExec, getExecs,  insertExec, updateExecs} from "../drizzel/query";
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

        const body = req.body;
        const requiredKeys = [
            body.first_name,
            body.last_name,
            body.position,
        ];
        const keyCheck = requiredKeys.every(key => key !== undefined);

        if(keyCheck){
            
            let newExec : Omit<exec, "id"> = {
                first_name: body.first_name,
                last_name: body.last_name,
                position: body.position,
            };

            if(body.profilePic !== undefined){
                newExec.profilePic = body.profilePic;
            }

            if(body.social !== undefined){
                newExec.social = body.social;
            }
            
            try{
                await insertExec(newExec);
                res.status(200).json({'error': false, 'message': "added sucessfully"});
            }catch (err){
                console.log(err);
                res.status(500).json({'error': true, 'message': "Internal error", 'error message': err});
            }
        }else{
            res.status(400).json({'error': true, 'message': "Missing required fields"});
        }
    }
)

userRouter
.route("/delete")
.delete(
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
.delete(
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
            res.status(500).json({error: true, error_message: err});
        }
    }
)

// will clean later
userRouter.post("/update/:id", 
    async (req : Request<idExecParamType, {}, addExecType>, res : Response)=>{
        // @ts-ignore
        if(!req.session.auth){
            res.status(401).json({'error': true, 'message': "No autherization"});
            return;
        };
        const body = req.body;
        const _id = req.params.id
        try{
            const exec = await getExec(_id);
            if( exec.length == 0 ){
                res.status(400).json({error: true, message: "Exec not found."});
                return;
            }

            const {id, ...info} = exec[0];
            let updateExec : Omit<Omit<exec, "id">, "socialID"> = info;
            
            Object.keys(body).forEach(key => {
                // @ts-ignore
                if(body[key] !== undefined){
                    switch(key){
                        case "first_name":
                            updateExec.first_name = body.first_name;
                            break;
                        case "last_name":
                            updateExec.last_name = body.last_name;
                            break;
                        case "profilePic":
                            updateExec.profilePic = body.profilePic;
                            break;                       
                        case "position":
                            updateExec.position = body.position;
                            break;
                        case "social":
                            updateExec.social = body.social;
                            break;
                        default:
                            break;
                    }
                }
            });

            await updateExecs(_id, updateExec);
            res.status(200).json({error: false, message: "exec updated"});
        }catch(err){
            console.log(err);
            res.status(500).json({error: true, error_message: err});
        }

    }
);

userRouter
.route("/")
.get(
    async (req: Request, res: Response)=>{
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
import { Request, Response, Router } from "express";  
import { addExecType, idExecParamType } from "../dtos/Exec.dto";
import { createSocials, deleteExec, getExec, getExecs, insertExec} from "../drizzel/query";
import { exec, exec_socials, execTable } from "../drizzel/schema";

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
            body.email,
            body.gender,
            body.email,
            body.stream,
            body.position,
            body.info,
        ];
        const keyCheck = requiredKeys.every(key => key !== undefined);

        if(keyCheck){
            
            let newExec : Omit<exec, "id"> = {
                first_name: body.first_name,
                last_name: body.last_name,
                email: body.email,
                gender: body.gender,
                pronouns: body.pronouns,
                stream: body.stream,
                position: body.position,
                info: body.info
            };

            if(body.profilePic !== undefined){
                newExec.profilePic = body.profilePic;
            }
            
            let socials : Omit<exec_socials, "id"> = {};
            if(body.Linkedin !== undefined){
                socials.Linkedin = body.Linkedin;
            }
            if(body.Instagram !== undefined){
                socials.Instagram = body.Instagram;
            }
            if(body.Twitter !== undefined){
                socials.Twitter = body.Twitter;
            }

            try{
                let socialReturn = await createSocials(socials);
                newExec.socialID = socialReturn[0].id;
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
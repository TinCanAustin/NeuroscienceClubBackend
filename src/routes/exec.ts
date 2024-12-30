import { Request, Response, Router } from "express";  
import { addExecType, idExecParamType } from "../dtos/Exec.dto";
import { createSocials, deleteExec, getExec, getExecs, getExecSocials, insertExec, updateExecs} from "../drizzel/query";
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

            const {id, socialID, ...info} = exec[0];
            let updateExec : Omit<Omit<exec, "id">, "socialID"> = info;

            const socials = await getExecSocials(socialID ?? "");
            if(socials.length == 0){
                res.status(400).json({error: true, message: "Exec format is incorrect."});
                return;
            }
            
            let updateSocials : Omit<exec_socials, "id"> = {
                Instagram : socials[0].Instagram,
                Twitter : socials[0].Twitter,
                Linkedin : socials[0].Linkedin
            }
            
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
                        case "email":
                            updateExec.email = body.email;
                            break;
                        case "gender":
                            updateExec.gender = body.gender;
                            break;
                        case "pronouns":
                            updateExec.pronouns = body.pronouns;
                            break;
                        case "profilePic":
                            updateExec.profilePic = body.profilePic;
                            break;
                        case "info":
                            updateExec.info = body.info;
                            break;
                        case "Linkedin":
                            updateSocials.Linkedin = body.Linkedin;
                            break;
                        case "Instagram":
                            updateSocials.Instagram = body.Instagram;
                            break;
                        case "Twitter":
                            updateSocials.Twitter = body.Twitter;
                            break;
                        case "stream":
                            updateExec.stream = body.stream;
                            break;
                        case "position":
                            updateExec.position = body.position;
                            break;
                        default:
                            break;
                    }
                }
            });

            await updateExecs(_id, socialID ?? "" , updateExec, updateSocials);
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
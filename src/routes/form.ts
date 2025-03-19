import { Response, Request, Router } from "express";
import { userFormAdd, formParam } from "../dtos/userForm.dot";
import { form } from "../drizzel/schema";
import { addUserForm, getUserForm, deleteUserForm } from "../drizzel/query";

const userForm = Router();

userForm.get("/", 
    async (req: Request, res: Response) => {
        try{
            const userForms = await getUserForm();
            res.status(200).json({'error': false, 'userForms': userForms});
        }catch(err){
            console.log(err);
            res.status(500).json({'error': true, 'message': 'internal error'});
        }
    }
);

userForm.post("/send", 
    async (req: Request<{}, {}, userFormAdd>, res: Response)=>{
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const body = req.body.body;
        
        if(first_name != undefined && last_name != undefined && email != undefined && body != undefined){
            try{
                const userFormContent : Omit<form, "id"> = {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    body: body
                };

                await addUserForm(userFormContent);

                res.status(200).json({'error': false, 'message' : 'form sent'});
            }catch(err){
                console.log(err);
                res.status(500).json({'error': true, 'message': "internal error"});
            }
        }else{
            res.status(400).json({'error': true, 'message': "Missing required fields"});
        }
    }
);

userForm.delete("/delete/:id", 
    async (req: Request<formParam>, res: Response)=>{
        // @ts-ignore
        if(!req.session.auth){
            res.status(401).json({'error': true, 'message': "No autherization"});
            return;
        };

        try{
            const form_id = req.params.id;

            const deleted = await deleteUserForm(form_id);

            if(deleted.length == 0){
                res.status(400).json({'error': true, 'message': "Form not found."});
                return;
            }

            res.status(200).json({'error': false, message: "deleted successfully", delete_userFrom : deleted[0]});
        }catch(err){
            console.log(err);
            res.status(500).json({'error': true, 'message': "internal error"});
        }
    }
);

export default userForm;
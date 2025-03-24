import { Response, Request, Router, response } from "express";
import { userFormAdd, formParam } from "../dtos/userForm.dot";
import { config } from "dotenv";
import path from 'path';

config({path: path.resolve(__dirname, "../.env")});

const userForm = Router();

userForm.post("/send", 
    async (req: Request<{}, {}, userFormAdd>, res: Response)=>{
        if(req.body.first_name != undefined && req.body.last_name != undefined && req.body.email != undefined && req.body.body != undefined){
            const form : Record<string, string> = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                body: req.body.body
            };
            const url = req.protocol + "://" + req.get('host')

            try{
                const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                        'Origin': url,
                        'Referer': `${url}form/send`,
                    },
                    body: JSON.stringify({
                        service_id: process.env.SERVICE_ID,
                        template_id: process.env.TEMPLATE_ID,
                        user_id: process.env.EMAILJS_PUBLIC,
                        template_params: form
                    }),
                });

                if(!response.ok){
                    throw await response.text();
                }

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

export default userForm;
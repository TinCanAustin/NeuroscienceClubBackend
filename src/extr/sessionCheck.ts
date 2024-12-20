import { Request } from "express";

export default function checkSession(req: Request) : boolean{
    req.sessionStore.get(req.session.id, (err, sessionData) => {
        if(err){
            return false;
        };
        console.log(sessionData);
    });
    return true;
}

//not fully implimented yet. ignore this part
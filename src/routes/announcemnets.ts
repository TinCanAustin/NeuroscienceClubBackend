import { Request, Response, Router } from "express";
import { announcementAddType, announcementParam } from "../dtos/announemnt.dot";
import { announcement } from "../drizzel/schema";
import { addAnnouncement, deleteAnnouncement, getAnnouncement, getAnnouncements, updateAnnouncemnet } from "../drizzel/query";

const announcementRouter = Router();

announcementRouter.get("/", 
    async (req: Request, res: Response)=>{
        try{
            const announcements = await getAnnouncements();
            res.status(200).json({'error': false, 'announcements' : announcements});
        }catch(err){
            console.log(err);
            res.status(500).json({'error': true, 'message': 'internal error'})
        }
    }
);

announcementRouter.get("/:id", 
    async (req: Request<announcementParam>, res: Response)=>{
        // @ts-ignore
        if(!req.session.auth){
            res.status(401).json({'error': true, 'message': "No autherization"});
            return;
        };
        const id = req.params.id;
        try{
            const announcements = await getAnnouncement(id);
            if(announcements.length == 0){
                res.status(201).json({'error': true, 'announcements' : "Announcement not found"});
            }else{
                res.status(200).json({'error': false, 'announcements' : announcements[0]});
            }
        }catch(err){
            console.log(err);
            res.status(500).json({'error': true, 'message': 'internal error'})
        }
    }
);

announcementRouter.post('/add',
    async (req: Request<{}, {}, announcementAddType>, res: Response)=>{
        // @ts-ignore
        if(!req.session.auth){
            res.status(401).json({'error': true, 'message': "No autherization"});
            return;
        };

        const heading = req.body.heading;
        const body = req.body.body;

        if(heading != undefined && body != undefined){
            try{
                const now = new Date();
                const _date = new Date(now.getFullYear(), now.getMonth(), now.getDate());

                const announcement : Omit<announcement, "id"> = {heading : heading, date: _date ,body : body};
                await addAnnouncement(announcement);

                res.status(200).json({'error': false, 'message' : 'announcement added'})
            }catch(err){
                console.log(err);
                res.status(500).json({'error': true, 'message': "error", 'error message': err});
            }
        }
    }
)

announcementRouter.delete("/delete/:id", 
    async (req: Request<announcementParam>, res: Response)=>{
        // @ts-ignore
        if(!req.session.auth){
            res.status(401).json({'error': true, 'message': "No autherization"});
            return;
        };

        const id = req.params.id;
        try{
            const deleted : announcement[] = await deleteAnnouncement(id);

            if(deleted.length == 0){
                throw "Invalid id";
            }

            res.status(200).json({'error': false, "message": "Deleted announcement", "announcement" : deleted[0]});
        }catch(err){
            console.log(err);
            res.status(500).json({'error': true, 'message': err})
        }
    }
);

announcementRouter.post("/update/:id",
    async(req : Request<announcementParam, {}, announcementAddType>, res : Response) =>{
        // @ts-ignore
        if(!req.session.auth){
            res.status(401).json({'error': true, 'message': "No autherization"});
            return;
        };
        const body = req.body;
        const _id = req.params.id
        
        try{
            const announcements = await getAnnouncement(_id);
            if(announcements.length == 0){
                res.status(201).json({'error': true, 'announcements' : "Announcement not found"});
                throw "No user found";
            }

            const {id, ...info} = announcements[0];
            let updateAnnounce : Omit<announcement, "id"> = info;

            if("heading" in body){
                updateAnnounce.heading = body.heading;
            }
            if("body" in body){
                updateAnnounce.body = body.body;
            }

            const now = new Date();
            const _date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            updateAnnounce.date = _date;

            await updateAnnouncemnet(_id, updateAnnounce);

            res.status(200).json({error: false, message: "announcement updated"});
        }catch(e){
            console.log(e);
            res.status(500).json({error: true, error_message: e});
        }
    }
);

export default announcementRouter;
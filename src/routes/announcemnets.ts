import { Request, Response, Router } from "express";
import { announcementAddType, announcementParam } from "../dtos/announemnt.dot";
import { announcement } from "../drizzel/schema";
import { addAnnouncement, deleteAnnouncement, getAnnouncement, getAnnouncements } from "../drizzel/query";

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
        const id = req.params.id;
        try{
            const announcements = await getAnnouncement(id);
            res.status(200).json({'error': false, 'announcements' : announcements[0]});
        }catch(err){
            console.log(err);
            res.status(500).json({'error': true, 'message': 'internal error'})
        }
    }
);

announcementRouter.post('/add',
    async (req: Request<{}, {}, announcementAddType>, res: Response)=>{
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

announcementRouter.post("/delete/:id", 
    async (req: Request<announcementParam>, res: Response)=>{
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

export default announcementRouter;
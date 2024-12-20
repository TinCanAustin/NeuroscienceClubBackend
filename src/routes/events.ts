import { Request, Response, Router } from "express";
import { addEventType, idEventParam, addImageType } from "../dtos/event.dot";
import { event } from "../drizzel/schema";
import { addEventImage, deleteEvent, getEvent, getEventPhoto, getEvents, insertEvent } from "../drizzel/query";

const eventRouter = Router();

eventRouter.get('/',
    async (req: Request, res: Response)=>{
        // @ts-ignore
        if(!req.session.auth){
            res.status(401).json({'error': true, 'message': "No autherization"});
            return;
        };

        try{
            const events = await getEvents();
            if(events.length == 0){
                res.status(204).json({'error': true, 'message': "No events in db"});
                return;
            }
            res.status(200).json({'error': false, 'events': events});
        }catch(err){
            console.log(err);
            res.status(500).json({'error': true, 'message': 'internal error'})
        }
    }
)

eventRouter.get('/:id',
    async (req: Request<idEventParam>, res: Response)=>{
        // @ts-ignore
        if(!req.session.auth){
            res.status(401).json({'error': true, 'message': "No autherization"});
            return;
        };
        const id = req.params.id;
        try{
            const event = await getEvent(id);
            if(event.length == 0){
                res.status(400).json({'error': true, 'message': "Event not found"});
                return;
            }
            res.status(200).json({'error': false, 'event': event[0]});
        }catch(err){
            console.log(err);
            res.status(500).json({'error': true, 'message': 'internal error'})
        }
    }
)

eventRouter.post("/add", 
    async (req: Request<{}, {}, addEventType>, res: Response)=>{
        // @ts-ignore
        if(!req.session.auth){
            res.status(401).json({'error': true, 'message': "No autherization"});
            return;
        };

        const name = req.body.name;
        const date = req.body.date;
        const description = req.body.description;
        const status = req.body.status;
        const bannerURL = req.body.bannerURL;

        if(name != undefined && date != undefined && status != undefined && bannerURL != undefined){
            try{
                let _date = new Date(date);
                // console.log(_date.toString() == "Invalid Date");
                // console.log(typeof status == "boolean");

                if(typeof status != "boolean" || _date.toString() == "Invalid Date"){
                    throw "invalid data type or date formate";
                };

                const event: Omit<Omit<event, "id">, "eventImage"> = {name: name, date: _date, stauts: status, bannerURL: bannerURL, description: description || ""};
                await insertEvent(event);
                
                res.status(200).json({error: false, message: "Event added succesfully"});
            }catch(err){
                console.log(err);
                res.status(500).json({'error': true, 'message': "error", 'error message': err});
            }
        }else{
            res.status(400).json({error: true, message: "wat are you doing"});
        }
    }
);

eventRouter
.route("/images/:id")
.get(
    async (req: Request<idEventParam>, res: Response)=>{
        // @ts-ignore
        if(!req.session.auth){
            res.status(401).json({'error': true, 'message': "No autherization"});
            return;
        };

        const id = req.params.id;
        
        try{
            const images = await getEventPhoto(id);

            if(images.length == 0){
                res.status(400).json({error: false, message: "id not found"});
                return;
            }

            res.status(200).json({error: false, message: "events photos fetched", images: images[0].image})
        }catch(err){
            console.log(err);
            res.status(500).json({error: true, message: "error", error_message: err});
        }
    }
)
.post(
    async (req: Request<idEventParam, {}, addImageType>, res: Response)=>{
        // @ts-ignore
        if(!req.session.auth){
            res.status(401).json({'error': true, 'message': "No autherization"});
            return;
        };

        const id = req.params.id;
        const url = req.body.url;

        if(url == undefined){
            res.status(400).json({error: false, message: "please enter a url"});
            return;
        }

        try{
            const images_quary = await getEventPhoto(id);
            if(images_quary.length == 0){
                res.status(400).json({error: false, message: "id not found"});
                return;
            }

            const images = images_quary[0].image;
            images.push(url);

            await addEventImage(id, images);
            res.status(200).json({error: false, message: "Image added to event"})
        }catch(err){
            console.log(err);
            res.status(500).json({error: true, message: "error", error_message: err});
        }
    }
);

eventRouter.post("/delete/:id", 
    async (req: Request<idEventParam>, res: Response)=>{
        // @ts-ignore
        if(!req.session.auth){
            res.status(401).json({'error': true, 'message': "No autherization"});
            return;
        };

        try{
            const _id = req.params.id;       

            const deleted = await deleteEvent(_id);

            if(deleted.length == 0){
                res.status(400).json({error: true, message: "Exec not found."});
                return;
            }

            res.status(200).json({error: false, message: "deleted successfully", deleted_event : deleted});
        }catch(err){
            console.log(err);
            res.status(500).json({error: true, message: "Internal error", error_message: err});
        }
    }
)

export default eventRouter;
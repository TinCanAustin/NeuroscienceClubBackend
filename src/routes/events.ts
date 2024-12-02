import { Request, Response, Router } from "express";
import { addEventType, idEventParam, addImageType } from "../dtos/event.dot";
import { event } from "../drizzel/schema";
import { addEventImage, getEventPhoto, insertEvent } from "../drizzel/query";

const eventRouter = Router();

eventRouter.post("/add", 
    async (req: Request<{}, {}, addEventType>, res: Response)=>{
        const name = req.body.name;
        const date = req.body.date;
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

                const event: Omit<Omit<event, "id">, "eventImage"> = {name: name, date: _date, stauts: status, bannerURL: bannerURL};
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
        const id = req.params.id;
        const url = req.body.url;

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

export default eventRouter;
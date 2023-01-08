import clientPromise from "../../lib/mongodb";
import { Message } from "../../utils/interfaces";

export default async (req: any, res: any) => {
    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
 
        switch (req.method) {
            case "POST":
            let data = JSON.parse(req.body);
            const insertedUser = await db
            .collection("comments")
            .insertOne(data);

            const reseponse: Message = {
                ...JSON.parse(req.body),
                _id: insertedUser.insertedId
            }
            res.json(reseponse);
    
                break;
            case "GET":
                const users = await db
                .collection("comments")
                .find<Message>({email: req.query.email})
                .sort({ metacritic: -1 })
                .toArray();
                res.json(users);
                    break;
        }
    } catch (e) {
     res.json(e);
     return res.status(405).end();
    }
 };
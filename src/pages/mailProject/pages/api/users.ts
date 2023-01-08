import clientPromise from "../../lib/mongodb";

export async function grouppedComments() {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const comments = await db.collection("comments").aggregate([
        {
            $group : {
                _id : "$movie_id",
                count: { $count: { } } 
            } 
        }
    ])
    .toArray();

    return { props: { comments: JSON.parse(JSON.stringify(comments)) } };
}

export default async (req: any, res: any) => {
   try {
       const client = await clientPromise;
       const db = client.db("sample_mflix");

       const users = await db
           .collection("users")
           .find({})
           .sort({ metacritic: -1 })
           .limit(10)
           .toArray();

       res.json(users);
   } catch (e) {
    res.json(e);
    return res.status(405).end();
   }
};

export async function users() {
   try {
       const client = await clientPromise;
       const db = client.db("sample_mflix");

       const users = await db
           .collection("users")
           .find({})
           .sort({ metacritic: -1 })
           .limit(10)
           .toArray();

       return { props: { users: JSON.parse(JSON.stringify(users)) } };
   } catch (e) {
       console.error(e);
   }
};

export async function getConnection(context: any) {
    try {
      await clientPromise
      // `await clientPromise` will use the default database passed in the MONGODB_URI
      // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
      //
      // `const client = await clientPromise`
      // `const db = client.db("myDatabase")`
      //
      // Then you can execute queries against your database like so:
      // db.find({}) or any of the MongoDB Node Driver commands
  
      return {
        props: { isConnected: true },
      }
    } catch (e) {
      console.error(e)
      return {
        props: { isConnected: false },
      }
    }
  }